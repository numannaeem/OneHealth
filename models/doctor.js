const mongoose = require('mongoose')
const { Schema } = mongoose;

const doctorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    available: {
        type: Boolean,
        required: true,
        default: true
    },

    name: {
        type: String,
        required: true
    },

    specialization: {
        type: String,
        required: true
    },

    qualifications: [String],

    experience: Number,

    DOB: {
        type: Date,
        required: true
    },

    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Appointments'
        }
    ]
})

module.exports = mongoose.model('Doctor', doctorSchema)