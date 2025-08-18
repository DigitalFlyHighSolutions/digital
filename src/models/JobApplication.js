const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    experience: { type: String, required: true },
    skills: { type: String, required: true },
    education: { type: String, required: true },
    linkedin: { type: String, required: true },
    expectedSalary: { type: String, required: true },
    noticePeriod: { type: String, required: true },
    coverLetter: { type: String, required: true },
    cvFileName: { type: String }, // store filename
    cvFilePath: { type: String }, // path on server
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
