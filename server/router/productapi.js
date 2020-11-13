const express = require('express')
const _ = require('lodash')
const Product = require('../models/product')
const { uploadPhoto, deletePhoto } = require('../middleware/uploadPhotos')
const { findOneAndDelete } = require('../models/product')

const router = express.Router()



// POST Request
router.post('/', uploadPhoto.single('photo'), async (req, res) => {
    try {
        let body = _.pick(req.body, ['title', 'description', 'price', 'stockQuantity', 'owner', 'category'])
        let product = new Product(body)
        product.photo = req.file.path

        await product.save()
        res.status(200).json({
            success: true,
            message: `Successfully saved product '${product.title}'`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// GET Request
// get all the products
router.get('/', async (req, res) => {
    try {
        let products = await Product.find().populate('owner category').populate('reviews', 'rating').exec() 
        // get all the products from the database along with all 
        //info about the associated owner and Category
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
// get a single product
router.get('/:id', async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id }).populate('owner category').populate('reviews', 'rating').exec()
        console.log('product with review\n', product);
        res.status(200).json({
            success: true,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// UPDATE Request
router.put('/:id', uploadPhoto.single('photo'), async (req, res) => {
    try {
        let { title, description, 
            price, stockQuantity, 
            category, owner } = _.pick(req.body, 
                ['title', 'description', 'price', 'stockQuantity', 'category', 'owner'])
        let product = await Product.findOne({ _id: req.params.id })
        let oldPhoto = product.photo
        let newPhoto = req.file.path
        if (oldPhoto !== newPhoto) {
            deletePhoto(oldPhoto)
        }
        let updateProduct = await Product.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    title: title,
                    description: description,
                    photo: req.file.path,
                    price: price,
                    stockQuantity: stockQuantity,
                    category: category,
                    owner: owner
                }
            },
            { upsert: true })
        res.status(200).json({
            success: true,
            updatedProduct: product
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
        let product = await Product.findOne({ _id: req.params.id})
        deletePhoto(product.photo)
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id })
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