const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Admin', adminSchema)