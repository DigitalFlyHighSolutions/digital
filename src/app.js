const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require("path");
const app = express();


const quoteRoute = require('./routes/quote');
const careerRoute = require('./routes/career');
const PORT = process.env.PORT || 6000;


require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



connectDB();


app.use('/quote', quoteRoute);
app.use('/apply',careerRoute);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));