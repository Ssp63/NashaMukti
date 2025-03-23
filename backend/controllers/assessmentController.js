const Assessment = require('../models/Assessment');
const User = require('../models/User');

// @desc    Get all assessments
// @route   GET /api/assessment
// @access  Public
exports.getAllAssessments = async (req, res) => {
  try {
    const { ageGroup, language } = req.query;
    
    // Build query
    const query = {};
    
    if (ageGroup) {
      query.ageGroup = ageGroup;
    }
    
    // Only get active assessments
    query.isActive = true;
    
    const assessments = await Assessment.find(query).select('title titleMarathi description descriptionMarathi ageGroup createdAt');
    
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single assessment by ID
// @route   GET /api/assessment/:id
// @access  Public
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    
    if (assessment) {
      res.json(assessment);
    } else {
      res.status(404).json({ message: 'Assessment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Submit assessment answers
// @route   POST /api/assessment/:id/submit
// @access  Private
exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    const assessment = await Assessment.findById(req.params.id);
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    // Calculate score
    let totalScore = 0;
    
    answers.forEach((answer, index) => {
      if (assessment.questions[index] && assessment.questions[index].options[answer]) {
        totalScore += assessment.questions[index].options[answer].score;
      }
    });
    
    // Find appropriate feedback based on score
    const feedback = assessment.feedbackRanges.find(
      range => totalScore >= range.minScore && totalScore <= range.maxScore
    );
    
    if (!feedback) {
      return res.status(400).json({ message: 'Could not calculate feedback for the score' });
    }
    
    // Save result to user if authenticated
    if (req.user) {
      const user = await User.findById(req.user._id);
      
      user.assessmentResults.push({
        score: totalScore,
        level: feedback.level,
        recommendations: feedback.recommendations
      });
      
      await user.save();
    }
    
    res.json({
      score: totalScore,
      level: feedback.level,
      feedback: feedback.feedback,
      feedbackMarathi: feedback.feedbackMarathi,
      recommendations: feedback.recommendations,
      recommendationsMarathi: feedback.recommendationsMarathi
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new assessment (admin only)
// @route   POST /api/assessment
// @access  Admin
exports.createAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.create(req.body);
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an assessment (admin only)
// @route   PUT /api/assessment/:id
// @access  Admin
exports.updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    
    if (assessment) {
      const updatedAssessment = await Assessment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      
      res.json(updatedAssessment);
    } else {
      res.status(404).json({ message: 'Assessment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}; 