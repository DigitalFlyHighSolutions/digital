"use strict";

var express = require('express');

var router = express.Router();

var Quote = require('../models/Quote');

var _require = require('../utils/mailer'),
    sendMail = _require.sendMail,
    transporter = _require.transporter;

router.post('/quote', function _callee(req, res) {
  var _req$body, name, businessName, email, phone, websiteUrl, socialMediaProfile, message;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log(req.body);
          try {
            _req$body = req.body, name = _req$body.name, businessName = _req$body.businessName, email = _req$body.email, phone = _req$body.phone, websiteUrl = _req$body.websiteUrl, socialMediaProfile = _req$body.socialMediaProfile, message = _req$body.message; // const quote = new Quote({
            //     name,
            //     businessName,
            //     email,
            //     phone,
            //     websiteUrl,
            //     socialMediaProfile,
            //     message
            // });
            // await quote.save();  
            //     const mailOptions = {
            //     from: 'rgaud4299@gmail.com',
            //     to: 'rgaud206@gmail.com',
            //     subject: 'digitalflyhigh',
            //     text: `Thank you for your quote request',
            //       Hi ${name} received your request. Our team will contact you soon.
            //       Hi ${name}We received your request. Our team will contact you soon.`
            // }
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.log("error ", error);
            //         return res.status(500).json({
            //             msg: 'failed to send otp',
            //             error: error.message
            //         })
            //     }
            //     res.status(200).json({
            //         msg: 'otp sent successfully'
            //     })
            // })
            // Send mail to client
            // await sendMail(
            //   email,
            //   'Thank you for your quote request',
            //   `Hi ${name},\n\nWe received your request. Our team will contact you soon.`,
            //   `<p>Hi ${name},</p><p>We received your request. Our team will contact you soon.</p>`
            // );
            // Send mail to HR
            // await sendMail(
            //   process.env.HR_EMAIL,
            //   'New Quote Request',
            //   `New quote from ${name} (${email}, ${phone}): ${message}`,
            //   `<p>New quote from <b>${name}</b> (${email}, ${phone}):<br>${message}</p>`
            // );

            res.status(201).json({
              message: 'Quote submitted and emails sent.'
            });
          } catch (err) {
            res.status(500).json({
              error: 'Something went wrong to backend.'
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;