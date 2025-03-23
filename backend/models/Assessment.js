const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  textMarathi: {
    type: String
  },
  options: [{
    text: String,
    textMarathi: String,
    score: Number
  }]
});

const FeedbackRangeSchema = new mongoose.Schema({
  minScore: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  feedbackMarathi: {
    type: String
  },
  recommendations: {
    type: String,
    required: true
  },
  recommendationsMarathi: {
    type: String
  }
});

const AssessmentSchema = new mongoose.Schema({
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
  ageGroup: {
    type: String,
    enum: ['teens', 'young-adults', 'adults', 'all'],
    default: 'all'
  },
  questions: [QuestionSchema],
  feedbackRanges: [FeedbackRangeSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', AssessmentSchema); 