const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const patientControllers = require('../controllers/patient')
const { validatePatient, canModify } = require('../utils/middleware')
//________________________________________________________________

//Routes to edit patient details

router.route('/:id')
    .get(catchAsync(patientControllers.getPatients))
    .patch(
        validatePatient,
        catchAsync(patientControllers.editPatient)
    )
    .delete(
        validatePatient,
        catchAsync(patientControllers.deletePatient)
    )
//________________________________________________________________

//Routes show all reports and get selected reports (Create after doctor routes)

//________________________________________________________________

//Routes to handle appointments

router.route('/:id/appointments')
    .get(
        validatePatient,
        catchAsync(patientControllers.getAppointments)
    )
    .post(
        validatePatient,
        catchAsync(patientControllers.createAppointment)
    )
// Fix  "Maximum call stack size exceeded" error

router.route('/:id/appointments/:appId')
    .patch(
        validatePatient,
        canModify,
        catchAsync(patientControllers.editAppointment)
    )

    .delete(
        validatePatient,
        canModify,
        catchAsync(patientControllers.deleteAppointment)
    )
//________________________________________________________________

//Register Patient

router.post('/register', catchAsync(patientControllers.register))

module.exports = router;