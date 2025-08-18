const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",   // Hostinger SMTP server
  port: 465,                    // use 465 for SSL, 587 for TLS
  secure: true,                 // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_COMPANY,  // your domain email (info@yourdomain.com)
    pass: process.env.MAIL_PASS       // the email password you set in Hostinger
  },
  tls: {
    rejectUnauthorized: false,   // helps if you face self-signed cert issues
  }
});

module.exports = transporter;
