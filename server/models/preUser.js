const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema


const PreUserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    confirmation: {
        type: Boolean,
        default: false
    }
})

// encrypting password before save
// we need to use vanilla javascript funtion because we will use 'this'
PreUserSchema.pre('save', function (next) {
    let user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err)
                }

                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

// we need a method to compare password given during login with the remaining one in the database
PreUserSchema.methods.comparePassword = function (password, next) {
    let user = this
    return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('PreUser', PreUserSchema)