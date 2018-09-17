'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }) // look for an email that matches
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'Email already exists'});
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.error(err));
          })
        })
      }
    })
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find user by email
  User.findOne({ username })
    .then(user => {
      // Check for user
      if(!user) {
        return res.status(404).json({ username: 'Username not found' });
      }

      // Check Password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(isMatch) {
          res.json({ msg: 'Success' });
        } else {
          return res.status(400).json({ password: 'Password incorrect' });
        }
      })
    });
})

module.exports = router;