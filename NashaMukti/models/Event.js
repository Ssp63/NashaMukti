const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  images: [{
    url: String,
    publicId: String
  }],
  reports: [{
    title: String,
    fileUrl: String,
    fileType: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better query performance
eventSchema.index({ district: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Event', eventSchema); 