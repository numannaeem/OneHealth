if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const LocalStrategy = require('passport-local')

const User = require('./models/user.js')
const Admin = require('./models/admin')
const userRoutes = require('./routes/user');
const patientRoutes = require('./routes/patient')
const doctorRoutes = require('./routes/doctor')

mongoose.connect('mongodb://localhost:27017/onehealth', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongod')
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })

const sessionConfig = {
    name: 'session',
    secret: 'numDB',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/', userRoutes);
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);


// Error Handler
app.use(function (err, req, res, next) {
    const { statusCode = 500 } = err
    if (!err.message) {
        err.message = 'Something went wrong'
    }
    res.status(statusCode).json(err)
});

app.listen(5000, () => {
    console.log('Hosted on port 5000')
})