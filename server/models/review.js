const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    headline: {
        type: String
    },

    body: {
        type: String
    },

    rating: {
        type: Number
    },

    photo: {
        type: String
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.model('Review', ReviewSchema)