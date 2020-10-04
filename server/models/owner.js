const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    about: {
        type: String
    },

    photo: {
        type: String
    }
})


module.exports = mongoose.model('Owner', OwnerSchema)