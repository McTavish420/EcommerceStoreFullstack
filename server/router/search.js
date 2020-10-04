const express = require('express')
const algoliaSearch = require('algoliasearch')
const router = express.Router()
const client = algoliaSearch(
    process.env.ALGOLIA_ID,
    process.env.ALGOLIA_SECRETE
)



const index = client.initIndex(process.env.ALGOLIA_INDEX)

router.post('/', async (req, res) => {
    try {
        let result = await index.search(req.body.title)
        res.status(200).json(result.hits)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})




module.exports = router