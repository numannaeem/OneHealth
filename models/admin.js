const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ]

})

module.exports = mongoose.model('Admin', adminSchema)