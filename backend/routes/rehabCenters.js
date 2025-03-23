const express = require('express');
const router = express.Router();
const { 
  getAllRehabCenters,
  getRehabCenterById,
  createRehabCenter,
  updateRehabCenter,
  deleteRehabCenter
} = require('../controllers/rehabCenterController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllRehabCenters);
router.get('/:id', getRehabCenterById);

// Admin routes
router.post('/', protect, admin, createRehabCenter);
router.put('/:id', protect, admin, updateRehabCenter);
router.delete('/:id', protect, admin, deleteRehabCenter);

module.exports = router; 