const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  
  try {
    const conn = await mongoose.connect(process.env.DB_PORT_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Stop the app if DB fails
  }
};

module.exports = connectDB;
 