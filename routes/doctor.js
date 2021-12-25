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
const { isAdmin, validateDoctor, canModifyDoctor } = require('../utils/middleware')

//________________________________________________________________

//Routes to get all Doctors and register a doctor

router.get('/', catchAsync(async (req, res) => {
    const { available } = req.query
    let doctors
    if ((available) && (available === 'true')) {
        doctors = await Doctor.find({ available: true }).populate('appointments')
    } else {
        doctors = await Doctor.find({}).populate('appointments')
    }
    if (!doctors.length) {
        throw new ExpressError('No Doctors Found', 404)
    }
    return res.status(200).json(doctors)
}))

router.post('/', isAdmin, catchAsync(async (req, res) => {
    const { email, password, name, specialization, available, qualifications, experience, DOB } = req.body
    if (isNaN(Date.parse(DOB))) {
        throw new ExpressError('Invalid Date', 403)
    }
    const role = 'doctor'
    const appointments = []
    const foundDoctor = await User.findOne({ email })
    if (foundDoctor) {
        throw new ExpressError('User Already Exists', 403)
    }

    const user = new User({ email, role, password })
    user.username = user.email
    const regUser = await User.register(user, password)
    const doctor = new Doctor({ available, name, specialization, qualifications, experience, DOB, appointments })
    doctor.user = regUser;
    doctor.appointments = appointments;
    const savedDoctor = await doctor.save();
    return res.status(201).json(savedDoctor);
}))

//________________________________________________________________

//Routes to modify and delete doctors

router.get('/:id', validateDoctor, catchAsync(async (req, res) => {
    const { id } = req.params
    const doctor = await Doctor.findById(id).populate('appointments').populate('user')
    if (!doctor) {
        throw new ExpressError('User not found', 404)
    }
    return res.status(200).json(doctor)
}))

router.patch('/:id', validateDoctor, catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError('User not found', 404);
    }

    const { name, specialization, available, qualifications, experience, DOB } = req.body
    const update = { name, specialization, available, qualifications, experience, DOB }
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, update, { new: true })
    return res.status(201).json(updatedDoctor)
}))

router.delete('/:id', isAdmin, catchAsync(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError('User not found', 404);
    }
    const deletedDoctor = await Doctor.findByIdAndDelete(id).populate('appointments').populate('user')
    if (!deletedDoctor) {
        throw new ExpressError('User not found', 404);
    }
    const userId = deletedDoctor.user._id;
    await User.findByIdAndDelete(userId);
    if (deletedDoctor.appointments.length) {
        for (appointment of deletedDoctor.appointments) {
            const appId = appointment._id
            const deletedApp = await Appointment.findByIdAndDelete(appId).populate('patient')
            await Patient.findByIdAndUpdate(deletedApp.patient._id, { $pull: { appointments: appId } })
        }
    }
    return res.status(200).json(deletedDoctor)
}))

//Routes to get all or a specififc appointment

router.get('/:id/appointments', validateDoctor, catchAsync(async (req, res) => {
    const { id } = req.params
    const doctor = await Doctor.findById(id).populate('appointments')
    const { appointments } = doctor
    if (!appointments.length) {
        throw new ExpressError('No Appointments Yet', 404)
    }
    return res.status(200).json(appointments)
}))

router.get('/:id/appointments/:appId', validateDoctor, catchAsync(async (req, res) => {
    const { id, appId } = req.params
    if (!mongoose.Types.ObjectId.isValid(appId)) {
        throw new ExpressError('User not found', 404);
    }
    const doctor = await Doctor.findById(id).populate('appointments')
    const { appointments } = doctor
    if (!appointments.length) {
        throw new ExpressError('No Appointments Yet', 404)
    }
    for (appointment of appointments) {
        if (appointment._id.valueOf() === appId) {
            return res.status(200).json(appointment)
        }
    }
    throw new ExpressError('Appointment not found', 404)
}))

module.exports = router;