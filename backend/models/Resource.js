const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleMarathi: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  descriptionMarathi: {
    type: String
  },
  type: {
    type: String,
    enum: ['video', 'article', 'guide', 'legal', 'other'],
    required: true
  },
  category: {
    type: String,
    enum: ['awareness', 'education', 'family-support', 'legal', 'treatment', 'other'],
    required: true
  },
  targetAudience: {
    type: String,
    enum: ['addicts', 'families', 'parents', 'counselors', 'all'],
    default: 'all'
  },
  url: {
    type: String
  },
  file: {
    type: String
  },
  thumbnail: {
    type: String
  },
  language: {
    type: String,
    enum: ['english', 'marathi', 'both'],
    default: 'both'
  },
  tags: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Resource', ResourceSchema); 