const mongoose = require('mongoose')
const mongooseAlgolia = require('mongoose-algolia')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    photo: {
        type: String
    },

    price: {
        type: Number
    },

    stockQuantity: {
        type: Number
    },

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})


ProductSchema.virtual('averageRating').get(function () {
    // console.log('review Length\n', this.reviews.length);
    if (this.reviews.length > 0) {
        let sum = this.reviews.reduce((total, review) => {
            // console.log('addition\t', (total + review.rating));
            return total + review.rating
        }, 0)

        // console.log('Sum of all:\t', sum);
        return Math.floor(sum / this.reviews.length)
    }

    return 0
})

ProductSchema.plugin(mongooseAlgolia, {
    appId: process.env.ALGOLIA_ID,
    apiKey: process.env.ALGOLIA_SECRETE,
    indexName: process.env.ALGOLIA_INDEX,

    selector: 'title _id photo description price rating averageRating owner',

    populate: {
        path: 'owner reviews',
        select: 'userName'
    },

    debug: true
})

let Model = mongoose.model('Product', ProductSchema)
Model.SyncToAlgolia()
Model.SetAlgoliaSettings({
    searchableAttributes: ['title']
})

module.exports = Model

