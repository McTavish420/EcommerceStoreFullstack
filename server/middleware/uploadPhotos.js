const cloudinary = require('cloudinary').v2
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config()
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { raw } = require('body-parser')
const fileUpload = require('express-fileupload')


// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRETE
})

// Store Management
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Ecommerce-Store',
        format: async (req, file) => 'jpeg', // supports promises as well
        public_id: (req, file) => file.originalname
    },
})

const deletePhoto = async (url) => {
    let link = url.toString()
    let photo = link.substring("https://res.cloudinary.com/dbscghdyt/image/upload/v1600893661/".length).slice(0, -4)
    await cloudinary.api.delete_resources(`${photo}`, { invalidate: true }, (err, res) => {
        if (err) {
            console.log(`Photo Error\n`, err)
        } else {
            console.log(`Photo response\n`, res)
        }
    })
}

const uploadPhoto = multer({ storage: storage })
module.exports = { uploadPhoto, deletePhoto }