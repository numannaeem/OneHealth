const express = require('express')
const app = express()
const router = express.Router();
const path = require('path')
const methodOverride = require('method-override')
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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Routes go here

// Error Handler
app.use(function(err, req, res, next) {
  // render the error page
  res.render('error', {error});
});

app.listen(3000, () => {
    console.log('Hosted on port 3000')
})