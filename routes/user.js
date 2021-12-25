const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const userControllers = require('../controllers/user')
const { isAdmin } = require('../utils/middleware')

router.post('/login', passport.authenticate('local'), catchAsync(userControllers.login))

router.get('/appointments', isAdmin, catchAsync(userControllers.getAllAppointments))

router.get('/reports', isAdmin, catchAsync(userControllers.getAllReports))

router.get('/users', isAdmin, catchAsync(userControllers.getAllUsers))

module.exports = router;