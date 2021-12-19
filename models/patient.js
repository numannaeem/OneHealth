const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },

    mobile: {
        type: String,
        required: true
    },
})

module.exporst = mongoose.model('Patient', patientSchema);