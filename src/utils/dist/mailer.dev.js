"use strict";

var nodemailer = require('nodemailer');

require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  // Gmail Service Use करें
  secure: true,
  auth: {
    user: process.env.EMAIL_company,
    pass: process.env.MAIL_PASS
  }
});
module.exports = transporter;