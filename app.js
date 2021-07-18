const express = require('express');
const app = express()
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const expresslayouts = require('express-ejs-layouts');

// body parser
app.use(bodyparser.urlencoded({ extended: false }))

// View Engine
app.use(expresslayouts);
app.set('view engine', 'ejs');

// environment variables
dotenv.config({ path: './config/config.env' })


// routes
app.use('/', require('./routes/search'))



// connection
app.listen(process.env.PORT, () => { console.log(`Connected to port ${process.env.PORT}`) })