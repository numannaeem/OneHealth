const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const Admin = require('../models/admin');
const Doctor = require('../models/doctor');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

//Middleware to validate patient
const validatePatient = catchAsync(async (req, res, next) => {
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

const canModify = catchAsync(async (req, res, next) => {
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

//________________________________________________________________

//Routes to edit patient details


//________________________________________________________________

//Routes to handle appointments

router.get('/:id/appointments', validatePatient, catchAsync(async (req, res) => {
    const { id } = req.params;
    const appointments = await Appointment.find({ patient: id }).populate('doctor').populate('patient')
    if (!appointments.length) {
        throw new ExpressError('No Appointments Yet', 404)
    }

    return res.status(200).json(appointments)

}))

router.post('/:id/appointments', validatePatient, catchAsync(async (req, res) => {
    const { id } = req.params;
    const { datetime, description, doctorId } = req.body
    const patient = await Patient.findById(id);
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        throw new ExpressError('Doctor not found', 404);
    }
    const doctor = await Doctor.findById(doctorId);
    if ((!patient) || (!doctor)) {
        throw new ExpressError('User not found', 404)
    }
    const appointment = new Appointment({ datetime, description })
    appointment.doctor = doctor
    appointment.patient = patient
    const savedApp = await appointment.save();
    patient.appointments.push(appointment)
    doctor.appointments.push(appointment)
    await patient.save();
    await doctor.save();
    return res.status(200).json(savedApp)
}))

router.patch('/:id/appointments/:appId', validatePatient, canModify, catchAsync(async (req, res) => {
    const { id, appId } = req.params;
    const { datetime, description, doctorId } = req.body
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new ExpressError('User not found', 404)
    }
    const update = { datetime, description, doctor }
    const updatedApp = await Appointment.findByIdAndUpdate(appId, update, { new: true })
    if (!updatedApp) {
        throw new ExpressError('No Appointments Yet', 404)
    }
    return res.status(200).json(updatedApp)
}))

router.delete('/:id/appointments/:appId', validatePatient, canModify, catchAsync(async (req, res) => {
    const { id, appId } = req.params;
    const deletedApp = await Appointment.findByIdAndDelete(appId).populate('patient').populate('doctor')
    await Patient.findByIdAndUpdate(id, { $pull: { appointments: appId } })
    await Doctor.findByIdAndUpdate(deletedApp.doctor._id, { $pull: { appointments: appId } })
    return res.status(200).json(deletedApp)
}))

//________________________________________________________________

//Register Patient

router.post('/register', catchAsync(async (req, res) => {
    const { email, role, password, age, name, address, gender, mobile } = req.body
    const foundPatient = await User.findOne({ email })
    const appointments = []
    if (foundPatient) {
        throw new ExpressError('User Already Exists', 403)
    }
    const user = new User({ email, role, password })
    user.username = user.email
    const regUser = await User.register(user, password)
    const patient = new Patient({ age, name, address, gender, mobile, appointments })
    patient.user = regUser;
    patient.appointments = appointments
    const savedPatient = await patient.save()
    req.login(regUser, function (err) {
        if (err) {
            return next(err)
        }
    })
    return res.status(200).json(savedPatient)

}))

module.exports = router;