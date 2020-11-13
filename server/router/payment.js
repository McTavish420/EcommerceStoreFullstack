const express = require('express')
const moment = require('moment')
const stripe = require('stripe')(process.env.STRIPE_SECRETE)
const authenticate = require('../middleware/authenticate')
const Order = require('../models/order')
const User = require('../models/user')
const nodemailer = require('nodemailer')

const router = express.Router()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADD, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
})
const SHIPMENT = {
    normal: {
        price: 13.98,
        days: 14
    },

    fast: {
        price: 59.98,
        days: 4
    }
}

function shipmentPrice (shipmentOption) {
    let estimated = moment().add(shipmentOption.days, 'd').format('dddd MMMM Do')
    return {
        estimated,
        price: shipmentOption.price
    }
}


router.post('/shipment', (req, res) => {
    let shipment

    if (req.body.shipment === 'normal') {
        shipment = shipmentPrice(SHIPMENT.normal)
    } else {
        shipment = shipmentPrice(SHIPMENT.fast)
    }

    res.status(200).json({
        success: true,
        shipment: shipment
    })
})


router.post('/pay', authenticate, (req, res) => {
    let totalPrice = Math.round(req.body.totalPrice * 100)

    stripe.customers
    .create({
        email: req.decoded.email
    })
    .then(customer => {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        })
    })
    .then(source => {
        return stripe.charges.create({
            amount: totalPrice,
            currency: 'usd',
            customer: source.customer
        })
    })
    .then(async charge => {
        let order = new Order()
        let cart = req.body.cart

        cart.map(product => {
            order.products.push({
                productID: product._id,
                quantity: parseInt(product.quantity),
                price: product.price
            })
        })

        order.owner = req.decoded._id
        order.estimatedDelivery = req.body.estimatedDelivery
        order.totalBill = req.body.totalPrice

        await order.save()
        // console.log(order);
        let user = await User.findOne({ _id: req.decoded._id })

        const mailOptions = {
            from: '<no-reply> ecommercestore@gmail.com',
            to: user.email,
            subject: "You placed a new Order",
            text: `Your Oder ID is ${order._id}`,
            html: `<h3>Your Order ID: ${order._id}</h3>
                   <h4>Your Oder is will be delivered by ${order.estimatedDelivery}</h4>
                   <h4>Total Bill Paid: ${Number(order.totalBill).toFixed(2)}</h4>`
        };
        

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({
            success: true,
            message: `Successfully made a payment!!!`
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: error.message
        })
    })
})


module.exports = router