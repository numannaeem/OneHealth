const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.post('/login', passport.authenticate('local'), catchAsync(async (req, res) => {
    const { username, role } = req.body
    const user = await User.findOne({ username })
    if (user.role !== role) {
        throw new ExpressError(`${role} not found`, 404)
    }
    return res.status(200).json(user)
}))

module.exports = router;