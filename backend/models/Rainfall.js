const mongoose = require('mongoose');

const rainfallSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rainfall_mm: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rainfall', rainfallSchema);