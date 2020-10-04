const express = require('express')
const _ = require('lodash')
const Review = require('../models/review')
const Product = require('../models/product')
const authenticate = require('../middleware/authenticate')
const { uploadPhoto, deletePhoto } = require('../middleware/uploadPhotos')

const router = express.Router()

// POST Request
router.post('/:product', [authenticate, uploadPhoto.single('photo')], async (req, res) => {
    try {
        console.log(`decode: \n`, req.decoded);
        let data = _.pick(req.body, ['headline', 'body', 'rating'])
        const review = new Review(data)
        review.photo = req.file.path
        review.user = req.decoded._id
        review.product = req.params.product
        await Product.update({ $push: { reviews: review._id} })
        const saveReview = await review.save()
        if (saveReview) {
            res.status(200).json({
                success: true,
                message: `Successfully added Review`
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// GET Request
router.get('/:product', async (req, res) => {
    try {
        let productReview = await Review.find({
            product: req.params.product
        }).populate('user').exec()
        // get all the products from the database along with all info about the associated user
        res.status(200).json({
            success: true,
            reviews: productReview
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// UPDATE Request


// DELETE Request


module.exports = router