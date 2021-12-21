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
    try {
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
    } catch (err) {
        next(err)
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
    const { date, description, doctorId } = req.body
    const patient = await Patient.findById(id);
    const doctor = await Doctor.findById(doctorId);
    //const admin = await Admin.findOne({})
    if ((!patient) || (!doctor)) {
        throw new ExpressError('User Not Found', 404)
    }
    const appointment = new Appointment({ date, description })
    appointment.doctor = doctor
    appointment.patient = patient
    const savedApp = await appointment.save();
    patient.appointments.push(appointment)
    //admin.appointments.push(appointment)
    //await admin.save();
    await patient.save();
    return res.status(200).json(savedApp)
}))

router.patch('/:id/appointments', validatePatient, catchAsync(async (req, res) => {
    const { id } = req.params;

}))

router.delete('/:id/appointments', validatePatient, catchAsync(async (req, res) => {
    const { id } = req.params;
}))

//________________________________________________________________

//Register Patient

router.post('/register', catchAsync(async (req, res) => {
    const { email, role, password, age, name, address, gender, mobile } = req.body
    const foundPatient = await User.findOne({ email })
    if (foundPatient) {
        throw new ExpressError('User Already Exists', 403)
    }
    const user = new User({ email, role, password })
    user.username = user.email
    const regUser = await User.register(user, password)
    const patient = new Patient({ age, name, address, gender, mobile })
    patient.user = regUser;
    const savedPatient = await patient.save()
    req.login(regUser, function (err) {
        if (err) {
            return next(err)
        }
    })
    return res.status(200).json(savedPatient)

}))

module.exports = router;