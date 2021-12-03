const express = require('express')
const app = express()
const router = express.Router();
const path = require('path')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index');
const ExpressError = require('./utils/ExpressError')
const catchAsync = require('./utils/catchAsync')

mongoose.connect('mongodb://localhost:27017/<dbname>', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongod')
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//Routes go here

app.get('/', (req, res) => {
    res.send('Test')
})

// Error Handler
app.use(function (err, req, res, next) {
    // render the error page
});

app.listen(3000, () => {
    console.log('Hosted on port 3000')
})