const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const patientControllers = require('../controllers/patient')
const { validatePatient, canModify } = require('../utils/middleware')
//________________________________________________________________

//Routes to edit patient details

router.get('/:id', catchAsync(patientControllers.getPatients))

router.patch('/:id', validatePatient, catchAsync(patientControllers.editPatient))

router.delete('/:id', validatePatient, catchAsync(patientControllers.deletePatient))
//________________________________________________________________

//Routes show all reports and get selected reports (Create after doctor routes)

//________________________________________________________________

//Routes to handle appointments

router.get('/:id/appointments', validatePatient, catchAsync(patientControllers.getAppointments))

router.post('/:id/appointments', validatePatient, catchAsync(patientControllers.createAppointment))
// Fix  "Maximum call stack size exceeded" error

router.patch('/:id/appointments/:appId', validatePatient, canModify, catchAsync(patientControllers.editAppointment))

router.delete('/:id/appointments/:appId', validatePatient, canModify, catchAsync(patientControllers.deleteAppointment))

//________________________________________________________________

//Register Patient

router.post('/register', catchAsync(patientControllers.register))

module.exports = router;