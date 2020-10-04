const express = require('express')
const _ = require('lodash')
const Category = require('../models/category')

const router = express.Router()

// POST Request
router.post('/', async (req, res) => {
    try {
        let type = req.body.type
        const category = new Category()
        category.type = type
        await category.save()
        res.status(200).json({
            success: true,
            message: `Successfully added category ${type}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// GET Request
router.get('/', async (req, res) => {
    try {
        let categories = await Category.find() // get all the categories from the database
        res.status(200).json({
            success: true,
            categories: categories
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