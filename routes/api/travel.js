'use strict';
const express = require('express');
const router = express.Router();

// @route   GET api/travel/test
// @desc    Tests travel route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Travel Works' }));

module.exports = router;