const JobApplication = require("../models/JobApplication");
const transporter = require('../utils/mailer');
const util = require('util');
const sendMail = util.promisify(transporter.sendMail).bind(transporter);
const path = require("path");

const apply = async (req, res) => {
  try {
    const {
      role,
      fullName,
      email,
      mobileNumber,
      address,
      experience,
      skills,
      education,
      linkedin,
      expectedSalary,
      noticePeriod,
      coverLetter,
    } = req.body;

    const newApplication = new JobApplication({
      role,
      fullName,
      email,
      mobileNumber,
      address,
      experience,
      skills,
      education,
      linkedin,
      expectedSalary,
      noticePeriod,
      coverLetter,
      cvFileName: req.file?.filename,
      cvFilePath: req.file ? path.join("uploads/cv", req.file.filename) : null,
    });

    await newApplication.save();

    // 🎨 Common Styles
    const containerStyle = "font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333;border:1px solid #ddd;border-radius:6px;overflow:hidden;max-width:650px;margin:auto;background:#fff;";
    const headerStyle = "background:#2E86C1;text-align:center;padding:20px;border-bottom:3px solid #1A5276;";
    const bodyStyle = "padding:20px;";
    const footerStyle = "background:#f4f4f4;color:#777;text-align:center;padding:10px;font-size:12px;border-top:1px solid #ddd;";

    // ✅ Change this to your actual logo URL
    const logoURL = "https://media.licdn.com/dms/image/v2/D4D03AQE4SuJhB1QQJQ/profile-displayphoto-scale_400_400/B4DZhBbmJHGsAk-/0/1753444410583?e=1758153600&v=beta&t=8-XlkU4X58SintTpcTVXjZwNFda3YUo3XNGBErs_pOI";

    // 📩 Mail to Applicant
    const mailUser = {
      from: process.env.EMAIL_COMPANY,
      to: email,
      subject: `✅ Application Received - ${role} @ Digital Fly High`,
      html: `
        <div style="${containerStyle}">
          <div style="${headerStyle}">
            <img src="${logoURL}" alt="Digital Fly High" style="max-width:200px;height:auto;" />
          </div>
          <div style="${bodyStyle}">
            <h2 style="color:#2E86C1;">Hi ${fullName},</h2>
            <p>Thank you for applying for the <b>${role}</b> position at <b>Digital Fly High</b>.</p>
            <p>We’ve received your application successfully, and our recruitment team will review it shortly. If your profile matches, we’ll reach out to you soon.</p>
            
            <h3 style="color:#2E86C1;">Your Application Details:</h3>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td><b>Full Name:</b></td><td>${fullName}</td></tr>
              <tr><td><b>Email:</b></td><td>${email}</td></tr>
              <tr><td><b>Phone:</b></td><td>${mobileNumber || "N/A"}</td></tr>
              <tr><td><b>Role Applied:</b></td><td>${role}</td></tr>
              <tr><td><b>Experience:</b></td><td>${experience || "N/A"}</td></tr>
              <tr><td><b>Education:</b></td><td>${education || "N/A"}</td></tr>
              <tr><td><b>Skills:</b></td><td>${skills || "N/A"}</td></tr>
              <tr><td><b>LinkedIn:</b></td><td><a href="${linkedin}" target="_blank">${linkedin || "N/A"}</a></td></tr>
              <tr><td><b>Expected Salary:</b></td><td>${expectedSalary || "N/A"}</td></tr>
              <tr><td><b>Notice Period:</b></td><td>${noticePeriod || "N/A"}</td></tr>
            </table>

            <p style="margin-top:20px;">We appreciate your interest in joining our team 💼</p>
            <p style="color:#555;">Best Regards,<br/>✨ HR Team - Digital Fly High</p>
          </div>
          <div style="${footerStyle}">
            © ${new Date().getFullYear()} Digital Fly High. All Rights Reserved.
          </div>
        </div>
      `
    };

    // 📩 Mail to HR
    const mailHR = {
      from: process.env.EMAIL_COMPANY,
      to: process.env.HR_EMAIL,
      subject: `📌 New Job Application - ${role}`,
      html: `
        <div style="${containerStyle}">
          <div style="background:#C0392B;text-align:center;padding:20px;border-bottom:3px solid #922B21;color:#fff;">
            <img src="${logoURL}" alt="Digital Fly High" style="max-width:200px;height:auto;" />
            <h2 style="margin-top:10px;">🚨 New Job Application</h2>
          </div>
          <div style="${bodyStyle}">
            <h3>Candidate Details</h3>
            <p><b>Name:</b> ${fullName}</p>
            <p><b>Role Applied:</b> ${role}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${mobileNumber || "N/A"}</p>
            <p><b>Address:</b> ${address || "N/A"}</p>
            <p><b>Experience:</b> ${experience || "N/A"}</p>
            <p><b>Education:</b> ${education || "N/A"}</p>
            <p><b>Skills:</b> ${skills || "N/A"}</p>
            <p><b>LinkedIn:</b> <a href="${linkedin}" target="_blank">${linkedin || "N/A"}</a></p>
            <p><b>Expected Salary:</b> ${expectedSalary || "N/A"}</p>
            <p><b>Notice Period:</b> ${noticePeriod || "N/A"}</p>
            <p><b>Cover Letter:</b> ${coverLetter || "N/A"}</p>
            ${
              req.file
                ? `<p><b>CV Attached:</b> ${req.file.filename}</p>`
                : `<p><b>CV:</b> Not uploaded</p>`
            }
          </div>
          <div style="${footerStyle}">
            This is an automated notification from the careers portal.
          </div>
        </div>
      `,
      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              path: req.file.path,
            },
          ]
        : [],
    };

    await Promise.all([sendMail(mailUser), sendMail(mailHR)]);

    res.status(201).json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error saving job application:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = apply;
