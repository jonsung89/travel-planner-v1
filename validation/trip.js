'use strict';
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTripInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters'
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Trip handle is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}