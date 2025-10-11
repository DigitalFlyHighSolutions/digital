const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",       // Hostinger SMTP server
  port: 465,                        // 465 = SSL, 587 = TLS
  secure: true,                     // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_COMPANY, // full email e.g. hr@yourdomain.com
    pass: process.env.MAIL_PASS      // the email password set in Hostinger
  },
  tls: {
    rejectUnauthorized: true,        // safer than false (use false only for debugging)
  },
  logger: process.env.NODE_ENV === "development", // detailed logs in dev
  debug: process.env.NODE_ENV === "development",  // show SMTP traffic in dev
});

// Test connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

module.exports = transporter;
