const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/api')); // Import API routes 

// Database connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecodata';
mongoose.connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB at ${mongoUri.includes('mongodb.net') ? 'Atlas' : 'localhost'}`);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Tip: If using Atlas, make sure your IP is whitelisted at https://cloud.mongodb.com');
  });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Sri Lanka Eco Visualization API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});