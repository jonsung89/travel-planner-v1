'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  destination: [{
    location: {
      type: String,
      required: true
    },
    dateFrom: {
      type: Date,
      required: true
    },
    dateTo: {
      type: Date, 
      required: true
    }, 
    activity: [{
      name: {
        type: String,
        // required: true
      },
      timeFrom: {
        type: String
      },
      timeTo: {
        type: String
      }, 
      cost: {
        type: Number,
        default: 0
      }, 
      note: {
        type: String
      }
    }],
    totalBudget: {
      type: Number
    },
    note: {
      type: String
    }
    // totalCost - maybe
  }]
});

const Trip = mongoose.model('trips', TripSchema);

module.exports = Trip;