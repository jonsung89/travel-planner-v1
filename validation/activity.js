'use strict';
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateActivityInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.timeFrom = !isEmpty(data.timeFrom) ? data.timeFrom : '';
  data.timeTo = !isEmpty(data.timeTo) ? data.timeTo : '';
  data.cost = !isEmpty(data.cost) ? data.cost : '';

  if (Validator.isEmpty(data.name)) {
    errors.location = 'Activity name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};