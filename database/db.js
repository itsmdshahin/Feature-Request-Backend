const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODBURL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

module.exports = connectDB;
