const express = require('express');
const router = express.Router();
const jobApplication = require('../controllers/jobApplication');

const multer = require("multer");
const path = require("path");
const fs = require("fs");



const uploadDir = path.join(__dirname, "uploads/cv");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"uploads/cv");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});


const upload = multer({ storage });


router.post("/", upload.single("cv"),jobApplication)


module.exports = router;
