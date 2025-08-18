const express = require('express');
const router = express.Router();
const quote = require('../controllers/quote');


router.post('/',quote );


module.exports = router;