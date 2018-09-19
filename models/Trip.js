'use strict';
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
  // plural
  destination: [{
    trip: {
      type: Schema.Types.ObjectId,
      refPath: 'trips'
    },
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
    totalBudget: {
      type: Number
    },
    // totalCost - maybe
    note: {
      type: String
    },
    activities: [{
      location: {
        type: Schema.Types.ObjectId,
        refPath: 'destination'
      },
      name: {
        type: String,
        // required: true
      },
      dateFrom: {
        type: Date
      },
      dateTo: {
        type: Date
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
  }],
});

const Trip = mongoose.model('trips', TripSchema);

module.exports = Trip;