const express = require('express')
const Order = require('../models/order')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    try {
        let products = await Order.find({ owner: req.decoded._id }).deepPopulate('owner products.productID.owner').exec()

        res.status(200).json({
            success: true,
            products: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})





module.exports = router



