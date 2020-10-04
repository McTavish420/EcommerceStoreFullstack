const express = require('express')
const _ = require('lodash')
const Address = require('../models/address')
const User = require('../models/user')
const authenticate = require('../middleware/authenticate')
const axios = require('axios')

const router = express.Router()

// POST Request
router.post('/', authenticate, async (req, res) => {
    try {
        let body = _.pick(req.body, [
            'country',
            'fullName',
            'streetAddress',
            'city',
            'state',
            'zipCode',
            'phoneNumber',
            'deliveryInstructions',
            'securityCode'
        ])
        const address = new Address(body)
        address.user = req.decoded._id
        await address.save()
        res.status(200).json({
            success: true,
            message: `Successfully added Address`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// GET Request
router.get('/', authenticate, async (req, res) => {
    try {
        let addresses = await Address.find({ user: req.decoded._id }) // get all the categories from the database
        res.status(200).json({
            success: true,
            addresses: addresses
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
// get a particular address
router.get('/:id', authenticate, async (req, res) => {
    try {
        let foundAddress = await Address.findOne({
            _id: req.params.id
        })
        if (foundAddress) {
            res.status(200).json({
                success: true,
                address: foundAddress
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// getting the name of all the countries
router.get('/get/countries', async (req, res) => {
    try {
        let response = await axios.get('https://restcountries.eu/rest/v2/all') 
        res.status(200).json({
            success: true,
            countries: response.data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// UPDATE Request
router.put('/:id', authenticate, async (req, res) => {
    try {
        let foundAddress = await Address.findOne({
            user: req.decoded._id,
            _id: req.params.id
        })

        if (foundAddress) {
            if (req.body.country) {
                foundAddress.country = req.body.country
            }
            if (req.body.fullName) {
                foundAddress.fullName = req.body.fullName
            }
            if (req.body.streetAddress) {
                foundAddress.streetAddress = req.body.streetAddress
            }
            if (req.body.city) {
                foundAddress.city = req.body.city
            }
            if (req.body.state) {
                foundAddress.state = req.body.state
            }
            if (req.body.zipCode) {
                foundAddress.zipCode = req.body.zipCode
            }
            if (req.body.phoneNumber) {
                foundAddress.phoneNumber = req.body.phoneNumber
            }
            if (req.body.deliveryInstructions) {
                foundAddress.deliveryInstructions = req.body.deliveryInstructions
            }
            if (req.body.securityCode) {
                foundAddress.securityCode = req.body.securityCode
            }
            await foundAddress.save()

            res.status(200).json({
                success: true,
                message: 'Successfully Update the Address.'
            })

        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
// Make an address default
router.put('/set/default', authenticate, async (req, res) => {
    try {
        let address = await User.findOneAndUpdate({
            _id: req.decoded._id,   
        }, {
            $set: {
                address: req.body.id
            }
        })

        if (address) {
            res.status(200).json({
                success: true,
                message: 'Successfully Set the Address as default.'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


// DELETE Request
router.delete('/:id', authenticate, async (req, res) => {
    try {
        let deleteAddress = await Address.remove({
            user: req.decoded._id,
            _id: req.params.id
        })

        if (deleteAddress) {
            res.status(200).json({
                success: true,
                message: 'Successfully Delete the Address.'
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