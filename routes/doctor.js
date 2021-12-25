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

router.get('/', catchAsync(async (req, res) => {
    const doctors = await Doctor.find({}).populate('appointments')
    if (!doctors.length) {
        throw new ExpressError('No Doctors Found', 404)
    }
    return res.status(200).json(doctors)
}))
module.exports = router;