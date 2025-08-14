"use strict";

var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Your Name
  businessName: {
    type: String,
    required: true
  },
  // Business Name
  email: {
    type: String,
    required: true
  },
  // Business Email
  phone: {
    type: String,
    required: true
  },
  // Phone Number
  website: {
    type: String
  },
  // Your Website URL (Optional)
  social: {
    type: String
  },
  // Social Media Profile (Optional)
  message: {
    type: String,
    required: true
  },
  // Tell us about your project
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('Quote', quoteSchema);