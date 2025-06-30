const mongoose = require('mongoose');

const elephantSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  area_km2: {
    type: Number,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Elephant', elephantSchema);