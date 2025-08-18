const transporter = require('../utils/mailer');
const util = require('util');
const sendMail = util.promisify(transporter.sendMail).bind(transporter);
const Quote = require('../models/Quote');

const quote = async (req, res) => {
    try {
        const {
            name,
            businessName,
            email,
            phone,
            website,
            social,
            message
        } = req.body;

        const quote = new Quote({
            name,
            businessName,
            email,
            phone,
            website,
            social,
            message
        });

        await quote.save();
        console.log('Quotation Saved to DB');

        // 🎨 Common Styles
        const headerStyle = "background:#2E86C1;color:#fff;padding:15px;text-align:center;font-size:20px;font-weight:bold;border-radius:6px 6px 0 0;";
        const containerStyle = "font-family:Arial,sans-serif;line-height:1.6;color:#333;border:1px solid #ddd;border-radius:6px;overflow:hidden;max-width:600px;margin:auto;";
        const bodyStyle = "padding:20px;background:#fafafa;";
        const footerStyle = "background:#f4f4f4;color:#777;text-align:center;padding:10px;font-size:12px;border-top:1px solid #ddd;";

        // 📩 Mail to User (Acknowledgement)
        const mailUser = {
            from: process.env.EMAIL_COMPANY,
            to: email,
            subject: '✅ We received your Quote Request - Digital Fly High',
            html: `
                <div style="${containerStyle}">
                    <div style="${headerStyle}">
                        Digital Fly High
                    </div>
                    <div style="${bodyStyle}">
                        <h2 style="color:#2E86C1;">Hi ${name},</h2>
                        <p>Thank you for reaching out to <b>Digital Fly High</b>.</p>
                        <p>We’ve received your request and our team will review it shortly. 
                        One of our executives will contact you soon.</p>
                        
                        <h3 style="color:#2E86C1;">Your Submitted Details:</h3>
                        <table style="width:100%;border-collapse:collapse;">
                            <tr><td><b>Name:</b></td><td>${name}</td></tr>
                            <tr><td><b>Business Name:</b></td><td>${businessName || "N/A"}</td></tr>
                            <tr><td><b>Email:</b></td><td>${email}</td></tr>
                            <tr><td><b>Phone:</b></td><td>${phone || "N/A"}</td></tr>
                            <tr><td><b>Website:</b></td><td>${website || "N/A"}</td></tr>
                            <tr><td><b>Social:</b></td><td>${social || "N/A"}</td></tr>
                            <tr><td><b>Message:</b></td><td>${message || "N/A"}</td></tr>
                        </table>

                        <p style="margin-top:20px;">We appreciate your interest and look forward to working with you.</p>
                        <p style="color:#555;">Best Regards,<br/>✨ Team Digital Fly High</p>
                    </div>
                    <div style="${footerStyle}">
                        © ${new Date().getFullYear()} Digital Fly High. All Rights Reserved.
                    </div>
                </div>
            `
        };

        // 📩 Mail to HR (Internal Notification)
        const mailHR = {
            from: process.env.EMAIL_COMPANY,
            to: process.env.HR_EMAIL,
            subject: '📌 New Quote Request - Digital Fly High',
            html: `
                <div style="${containerStyle}">
                    <div style="background:#C0392B;color:#fff;padding:15px;text-align:center;font-size:20px;font-weight:bold;border-radius:6px 6px 0 0;">
                        🚨 New Quote Request
                    </div>
                    <div style="${bodyStyle}">
                        <p><b>Name:</b> ${name}</p>
                        <p><b>Business Name:</b> ${businessName || "N/A"}</p>
                        <p><b>Email:</b> ${email}</p>
                        <p><b>Phone:</b> ${phone || "N/A"}</p>
                        <p><b>Website:</b> ${website || "N/A"}</p>
                        <p><b>Social:</b> ${social || "N/A"}</p>
                        <p><b>Message:</b> ${message || "N/A"}</p>
                    </div>
                    <div style="${footerStyle}">
                        This is an automated notification from your website CRM.
                    </div>
                </div>
            `
        };

        // Send mails in parallel
        await Promise.all([sendMail(mailUser), sendMail(mailHR)]);

        res.status(201).json({ message: 'Quote submitted and emails sent.' });

    } catch (err) {
        console.error("Mail/DB Error:", err);
        res.status(500).json({ error: 'Something went wrong in backend.', err });
    }
};

module.exports = quote;
