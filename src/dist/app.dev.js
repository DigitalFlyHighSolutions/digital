"use strict";

var express = require('express');

var connectDB = require('./config/db');

var cors = require('cors');

var path = require("path");

var app = express();

var quoteRoute = require('./routes/quote');

var careerRoute = require('./routes/career');

var PORT = process.env.PORT || 6000;

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use("/uploads", express["static"](path.join(__dirname, "uploads")));
connectDB();
app.use('/quote', quoteRoute);
app.use('/apply', careerRoute);
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});