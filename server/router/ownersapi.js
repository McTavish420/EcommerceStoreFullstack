const express = require('express')
const _ = require('lodash')
const { uploadPhoto } = require('../middleware/uploadPhotos')
const Owner = require('../models/owner')

const router = express.Router()

// POST Request
router.post('/', uploadPhoto.single('photo'), async (req, res) => {
    try {
        let body = _.pick(req.body, ['name', 'about'])
        const owner = new Owner(body)
        owner.photo = req.file.path
        await owner.save()
        res.status(200).json({
            success: true,
            message: `Successfully added owner ${owner.name}`
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
        let owners = await Owner.find() // get all the owners from the database
        res.status(200).json({
            success: true,
            owners: owners
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