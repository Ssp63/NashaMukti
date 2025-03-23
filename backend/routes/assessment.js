const express = require('express');
const router = express.Router();
const { 
  getAllAssessments,
  getAssessmentById,
  submitAssessment,
  createAssessment,
  updateAssessment
} = require('../controllers/assessmentController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllAssessments);
router.get('/:id', getAssessmentById);

// Protected routes
router.post('/:id/submit', protect, submitAssessment);

// Admin routes
router.post('/', protect, admin, createAssessment);
router.put('/:id', protect, admin, updateAssessment);

module.exports = router; 