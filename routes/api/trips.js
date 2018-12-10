'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateTripInput = require('../../validation/trip');
const validateDestinationInput = require('../../validation/destination');
const validateActivityInput = require('../../validation/activity');

// Load Trip Model
const Trip = require('../../models/Trip');
// Load User Model
const User = require('../../models/User');





// @route   GET api/trips/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Trips Works' }));





// @route   GET api/trips/all
// @desc    Get all trips
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Trip.find()
    .then(trips => {
      if(!trips) {
        errors.notrips = 'There are no trips';
        return res.status(404).json();
      }
      res.json(trips);
    })
    .catch(err => res.status(404).json({ trip: 'There are no trips' }));
});





// @route   GET api/trips/user/:user_id
// @desc    Get all trips by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Trip.find({ user: req.params.user_id })
    .then(trip => {
      if (!trip) {
        errors.notrips = 'There are no trips for this user';
        res.status(404).json(errors);
      }

      res.json(trip);
    })
    .catch(err => res.status(404).json({ trip: 'There are no trips for this user' }));
});





// @route   GET api/trips/
// @desc    Get all trips for the user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => { // protected route with jwt token
  const errors = {};

  Trip.find({ user: req.user.id })
    .then(trip => {
      if (!trip) {
        errors.notrips = 'There are no trips for this user';
        return res.status(404).json(errors);
      }
      res.json(trip);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});





// @route   GET api/trips/handle/:handle
// @desc    Get trip by handle
// @access  Public
// router.get('/handle/:handle', (req, res) => {
//   const errors = {};

//   Trip.findOne({ handle: req.params.handle })
//     .then(trip => {
//       if (!trip) {
//         errors.notrips = 'There are no trips for this user';
//         res.status(404).json(errors);
//       }

//       res.json(trip);
//     })
//     .catch(err => res.status(404).json(err));
// });





// @route   POST api/trips/
// @desc    Create user trips
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { // protected route with jwt token
  const { errors, isValid } = validateTripInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  } 
  const tripFields = {};
  tripFields.user = req.user.id;

  if (req.body.handle) tripFields.handle = req.body.handle; 

  Trip.findOne({ handle: tripFields.handle })
    .then(trip => {
      // if (trip) {
      //   errors.handle = 'Please come up with a different unique name for your trip';
      //   return res.status(400).json(errors);
      // } else {
        new Trip(tripFields).save()
          .then(trip => {
            res.json(trip);
          });
      }
    // }
    );
});






// @route   GET api/trips/destination/:trip_id
// @desc    Add destination to trip
// @access  Private
router.get('/destination/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Trip.findOne({ user: req.user.id, _id: req.params.id })
    .then(trip => {
      if (!trip) {
        errors.notrips = 'There are no trips for this user';
        return res.status(404).json(errors);
      }
      res.json(trip);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});





// @route   POST api/trips/destination/:trip_id
// @desc    Add destination to trip
// @access  Private
router.post('/destination/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateDestinationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Trip.findOne({ user: req.user.id, _id: req.params.id })
    .then(trip => {
      const newDest = {
        location: req.body.location,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        totalBudget: req.body.totalBudget,
        note: req.body.note
      };

      // Add to dest array
      trip.destination.push(newDest);

      trip.save().then(trip => res.json(trip));
    });
});






// @route   DELETE api/trips/destination/:id/:destId
// @desc    Delete specified destination from trips
// @access  Private
router.delete('/destination/:id/:destId', passport.authenticate('jwt', { session: false }), (req, res) => {

  Trip.findOne({ user: req.user.id, _id: req.params.id })
    .then(trip => {
      // Get remove index
      const removeIndex = trip.destination.map(item => item.id).indexOf(req.params.destId);
      // Splice out of array
      trip.destination.splice(removeIndex, 1);

      // Save
      trip.save().then(trip => {
        console.log(req.params.destId)
        res.json(trip)
      });
    })
    .catch(err => res.status(404).json(err));
});







// @route   DELETE api/trips/:id
// @desc    Delete targeted trips
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  const { id } = req.params;
  // const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Trip.findOneAndDelete({ _id: id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json(err));
});






// @route   DELETE api/trips
// @desc    Delete user and all trips
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  Trip.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }));
    });
});

module.exports = router;