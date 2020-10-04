const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    country: {
        type: String
    },

    fullName: {
        type: String
    },

    streetAddress: {
        type: String
    },

    city: {
        type: String
    },

    state: {
        type: String
    },

    zipCode: {
        type: String
    },

    phoneNumber: {
        type: String
    },

    deliveryInstructions: {
        type: String
    },

    securityCode: {
        type: String
    }
})


module.exports = mongoose.model('Address', AddressSchema)