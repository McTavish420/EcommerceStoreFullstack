const express = require('express') 
// express => web framework Library that enables us
// to use HTTP requst like get, post, delete, patch, put
const morgan = require('morgan')
// morgan => is a logger that logs all the HTTP request come from
//the frontend and show them in the terminal
const bodyParser = require('body-parser')
// body-parser => is a library that parses all the data come 
// from the frontend in a specific format like json
const dotEnv = require('dotenv')
// dotenv => for importing environment variables from .env file
const _ = require('lodash')
// lodash => for picking up attribute from json format data
// const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
dotEnv.config()



// importing other dependent files
const { mongoose } = require('./mongoose')
const products = require('./router/productapi')
const categories = require('./router/categoryapi')
const owners = require('./router/ownersapi')
const auth = require('./router/auth')
const review = require('./router/review')
const address = require('./router/address')
const payment = require('./router/payment')
const orders = require('./router/order')
const searching = require('./router/search')



// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// enable files upload
// app.use(fileUpload({
//     createParentPath: true
// }))


// Using routes
app.use('/api/products', products)
app.use('/api/categories', categories)
app.use('/api/owners', owners)
app.use('/api/auth', auth)
app.use('/api/review', review)
app.use('/api/addresses', address)
app.use('/api/payment', payment)
app.use('/api/orders', orders)
app.use('/api/search', searching)


// Port Configuration
const port = process.env.PORT || 3001

// Server is listening
app.listen(port, (err) => {
    if (err) {
        console.log(`Something went wrong!!! \n${err}`)
    } else {
        console.log(`Everything's good to go... \nServer is listening on port: ${port}`)
    }
})