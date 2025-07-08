const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Maximum 10 connections
    });
    
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    
    // Provide specific error guidance
    if (error.message.includes('ENOTFOUND')) {
      console.log(`
💡 DNS Error Solutions:
   1. Check if your cluster is paused and resume it
   2. Verify your connection string format
   3. Try using standard connection format instead of SRV
   4. Change your DNS servers to 8.8.8.8 and 8.8.4.4
      `);
    }
    
    process.exit(1);
  }
};

module.exports = connectDB; 