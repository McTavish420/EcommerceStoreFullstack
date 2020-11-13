const express = require('express')
const _ = require('lodash')
const User = require('../models/user')
const PreUser = require('../models/preUser')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const authenticate = require('../middleware/authenticate')

const router = express.Router()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADD, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
})

/* Sign Up route */
router.post('/signup', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(500).json({
            success: false,
            message: `Please Enter Email or Password!!!`
        })
    } else {
        try {
            let body = _.pick(req.body, ['userName', 'email', 'password'])
            let newUser = new PreUser(body)
            await newUser.save()
            // console.log('signUp\n', newUser);
            let token = await jwt.sign(newUser.toJSON(), process.env.SECRETE, {
                expiresIn: 604800 // 1 week
            })

            // const url = `http://localhost:9000/verify/confirm?Authorization=${token}`
            const url = `https://ecommercestore2019.netlify.app/verify/confirm?Authorization=${token}`
            const mailOptions = {
                from: '<no-reply> ecommercestore@gmail.com',
                to: newUser.email,
                subject: "Welcome to Ecommerce Store",
                text: `${newUser.uerName}'s Confirmation is required`,
                html: `<h3>Please click <a href="${url}">HERE</a> for confirmation!!!</h3>`
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
                message: `Successfully created the new user ${newUser.userName}`,
                token: token
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
})

// Route Profile
router.get('/user', authenticate, async (req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.decoded._id }).populate('address')
        let sendUser = foundUser
        sendUser.password = 'cannot be shown'
        if (foundUser) {
            res.status(200).json({
                success: true,
                user: sendUser
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// finding whether email is available or not
router.post('/email', async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser) {
            res.status(200).json({
                success: true,
                message: 'This Email is available'
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'This Email is already taken. Try another one!!!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.post('/confirmation/:token', async (req, res) => {
    try {
        const x = await jwt.verify(req.params.token, process.env.SECRETE);
        let body = _.pick(x, ['email', 'password', 'userName', 'confirmation']);
        // console.log('confirm\n', body);
        body.confirmation = true
        let newUser = new User(body)
        // console.log('confirm user\n', newUser);
        await newUser.save()
        await PreUser.findOneAndDelete({ email: body.email })
        let token = await jwt.sign(newUser.toJSON(), process.env.SECRETE, {
            expiresIn: 604800 // 1 week
        })
        res.status(200).json({
            success: true,
            token: token,
            message: `Successfully created the new user ${newUser.userName}`
        })
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    
})

/* Log In Route */
router.post('/login', async (req, res) => {
    // console.log(req.body);
    try {
        let foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser) {
            res.status(403).json({
                success: false,
                message: `No User is found with email ${req.body.email}`
            })
        } else {
            if (foundUser.comparePassword(req.body.password)) {
                console.log(foundUser.comparePassword(req.body.password));
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRETE, {
                    expiresIn: 604800 // 1 Week
                })

                res.status(200).json({
                    success: true,
                    token: token
                })
            } else {
                res.status(403).json({
                    success: false,
                    message: `Authentication is Failed due to wrong Password`
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

/* Update A User Profile */
router.put('/user', authenticate, async (req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.decoded._id })
        if (foundUser) {
            if (req.body.userName) {
                foundUser.userName = req.body.userName
            }
            if (req.body.email) {
                foundUser.email = req.body.email
            }
            if (req.body.password) {
                foundUser.password = req.body.password
            }
        }

        await foundUser.save()
        res.status(200).json({
            success: true,
            message: 'Successfully Updated'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = router