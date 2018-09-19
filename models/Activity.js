'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActivitySchema = new Schema({
  
  activity: [{
    name: {
      type: String,
      required: true
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
  }]
});

const Activity = mongoose.model('activities', ActivitySchema);

module.exports = Activity;