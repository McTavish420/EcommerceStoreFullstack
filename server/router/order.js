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

router.get('/all', async (req, res) => {
    try {
        let products = await Order.find().deepPopulate('owner owner.address products.productID.owner').exec()

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

// DELETE Request
router.delete('/:id', async (req, res) => {
    try {
        let product = await Order.findOne({ _id: req.params.id })
        let deletedProduct = await Order.findOneAndDelete({ _id: req.params.id })
        if (deletedProduct) {
            res.status(200).json({
                success: true,
                message: `Successfully Deleted the Product!!!`
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})





module.exports = router



