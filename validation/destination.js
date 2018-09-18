'use strict';
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDestinationInput(data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : '';
  data.dateFrom = !isEmpty(data.dateFrom) ? data.dateFrom : '';
  data.dateTo = !isEmpty(data.dateTo) ? data.dateTo : '';
  // data.activity = !isEmpty(data.password) ? data.password : '';
  

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }
  if (Validator.isEmpty(data.dateFrom)) {
    errors.dateFrom = 'From date field is required';
  }
  if (Validator.isEmpty(data.dateTo)) {
    errors.dateTo = 'To date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};