const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();

const quoteRoute = require('./routes/quote');
const careerRoute = require('./routes/career');

const PORT = process.env.PORT || 6000;

// ✅ Connect database
connectDB();

// ✅ Use JSON middleware
app.use(express.json());

// ✅ Use CORS — allow only your frontend domain
app.use(cors({
  origin: [
    "https://digitalflyhigh.in",  // your live frontend
    "http://localhost:3000"       // optional, for local testing
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight requests globally
app.options('*', cors());

// ✅ Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use('/quote', quoteRoute);
app.use('/apply', careerRoute);

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
