const User = require('../models/user');
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')
const Admin = require('../models/admin');
const Appointment = require('../models/appointment')
const Report = require('../models/report')
const ExpressError = require('../utils/ExpressError');

module.exports.login = async (req, res) => {
    const { username, role } = req.body
    const foundUser = await User.findOne({ username })
    if (foundUser.role !== role) {
        throw new ExpressError('Unauthorized', 401)
    }

    let user
    switch (role) {
        case 'patient':
            const patient = await Patient.findOne({ user: foundUser._id })
            if (!patient) {
                throw new ExpressError('Unauthorized', 401)
            }
            user = { patient, foundUser }
            return res.status(200).json(user)
            break;
        case 'doctor':
            const doctor = await Doctor.findOne({ user: foundUser._id })
            if (!doctor) {
                throw new ExpressError('Unauthorized', 401)
            }
            user = { doctor, foundUser }
            return res.status(200).json(user)
            break;
        case 'admin':
            const admin = await Admin.findOne({ user: foundUser._id })
            if (!admin) {
                throw new ExpressError('Unauthorized', 401)
            }
            user = { admin, foundUser }
            return res.status(200).json(user)
            break;

        default:
            throw new ExpressError('Unauthorized', 401)
            break;
    }
}

module.exports.getAllAppointments = async (req, res) => {
    const appointments = await Appointment.find({}).populate('doctor').populate('patient')
    if (!appointments.length) {
        throw new ExpressError('No Appointments Found', 404)
    }
    res.status(200).json(appointments)
}

module.exports.getAllReports = async (req, res) => {
    const reports = await Report.find({}).populate('doctor').populate('patient')
    if (!reports.length) {
        throw new ExpressError('No Reports Found', 404)
    }
    res.status(200).json(reports)
}

module.exports.getAllUsers = async (req, res) => {
    const users = await User.find({})
    if (!users.length) {
        throw new ExpressError('No Users Found', 404)
    }
    res.status(200).json(users)
}