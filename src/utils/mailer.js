const nodemailer=require('nodemailer')
require('dotenv').config();





const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail Service Use करें
  secure: true, 
  auth: {
    
    user: process.env.EMAIL_company,
    pass: process.env.MAIL_PASS
  },
});

module.exports=transporter