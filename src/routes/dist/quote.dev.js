"use strict";

var express = require('express');

var router = express.Router();

var quote = require('../controllers/quote');

router.post('/', quote);
module.exports = router;