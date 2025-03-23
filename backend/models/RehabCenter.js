const mongoose = require('mongoose');

const RehabCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'Maharashtra'
  },
  pincode: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  type: {
    type: String,
    enum: ['government', 'ngo', 'private'],
    required: true
  },
  services: [{
    type: String,
    enum: ['detoxification', 'counseling', 'medication', 'therapy', 'rehabilitation', 'aftercare']
  }],
  capacity: {
    type: Number
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  workingHours: {
    type: String
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RehabCenter', RehabCenterSchema); 