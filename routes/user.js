const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const userControllers = require('../controllers/user')

router.post('/login', passport.authenticate('local'), catchAsync(userControllers.login))

module.exports = router;