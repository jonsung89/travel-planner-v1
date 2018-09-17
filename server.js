'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const travel = require('./routes/api/travel');
const trips = require('./routes/api/trips');


const app = express();

// Body parser middleware
// @desc  allows us to access req.body.<whatever> in our routes/api
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Use Routes
app.use('/api/users', users);
app.use('/api/travel', travel);
app.use('/api/trips', trips);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));