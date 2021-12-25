const mongoose = require('mongoose');

const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const Admin = require('../models/admin');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

module.exports.validatePatient = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError('User not found', 404);
    }
    const patient = await Patient.findById(id).populate('user');
    if (!patient) {
        throw new ExpressError('User not found', 404);
    }
    const user = patient.user
    if ((req.session.passport) && (req.session.passport.user === user.username)) {
        next()
    } else {
        throw new ExpressError('Unauthorized', 401)
    }
})

module.exports.canModify = catchAsync(async (req, res, next) => {
    const { appId, id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(appId)) {
        throw new ExpressError('Appointment not found', 404);
    }
    const appointment = await Appointment.findById(appId)
    if (!appointment) {
        throw new ExpressError('Appointment not found', 404);
    }
    if (appointment.patient.valueOf() === id) {
        next()
    } else {
        throw new ExpressError('Unauthorized', 401)
    }

})