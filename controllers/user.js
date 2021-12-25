const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');

module.exports.login = async (req, res) => {
    const { username, role } = req.body
    const user = await User.findOne({ username })
    if (user.role !== role) {
        throw new ExpressError('Unauthorized', 401)
    }
    return res.status(200).json(user)
}