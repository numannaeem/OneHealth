const User = require('../models/user');
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')
const Admin = require('../models/admin');
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