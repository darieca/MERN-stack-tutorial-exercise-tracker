const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { // username is key
        type: String,
        required: true,
        unique: true,
        trim: true, // trim whitespace off the end
        minlength: 3
    },
}, {
    timestamps: true, // auto create field when it was created / modified
})

const User = mongoose.model('User', userSchema)

module.exports = User;