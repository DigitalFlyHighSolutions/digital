"use strict";

var express = require('express');

var router = express.Router();

var jobApplication = require('../controllers/jobApplication');

var multer = require("multer");

var path = require("path");

var fs = require("fs");

var uploadDir = path.join(__dirname, "uploads/cv");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true
  });
}

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/cv");
  },
  filename: function filename(req, file, cb) {
    var uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
var upload = multer({
  storage: storage
});
router.post("/", upload.single("cv"), jobApplication);
module.exports = router;