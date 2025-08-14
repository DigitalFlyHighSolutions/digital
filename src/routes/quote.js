const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { sendMail, transporter } = require('../utils/mailer');

router.post('/quote', async (req, res) => {
    // console.log(req.body);

    try {
        const {
            name,
            businessName,
            email,
            phone,
            websiteUrl,
            socialMediaProfile,
            message
        } = req.body;

        // const quote = new Quote({
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

        res.status(201).json({ message: 'Quote submitted and emails sent.' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong to backend.' });
    }
});

module.exports = router;