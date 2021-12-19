const mongoose = require('mongoose')
const { Schema } = mongoose

const appSchema = new Schema({
    time: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ['A', 'P', 'R']
    },

    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },

    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },

})

module.exports = mongoose.model('Appointment', appSchema)