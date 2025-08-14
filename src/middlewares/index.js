const express = require('express');

const router = express.Router();

// Example middleware for logging requests
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Example middleware for authentication
const authenticate = (req, res, next) => {
    // Authentication logic here
    next();
};

// Exporting middleware functions
module.exports = {
    authenticate,
    router
};