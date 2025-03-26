const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, checkRole } = require('../middleware/auth');

// Get all users (admin only)
router.get('/',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get block officers (admin only)
router.get('/block-officers',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const officers = await User.find({ role: 'block_officer' }).select('-password');
      res.json(officers);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update user role (admin only)
router.put('/:id/role',
  auth,
  checkRole(['admin']),
  [
    body('role').isIn(['admin', 'block_officer', 'public']).withMessage('Invalid role'),
    body('district').if(body('role').equals('block_officer')).notEmpty().withMessage('District is required for block officers')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { role, district } = req.body;

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.role = role;
      user.district = role === 'block_officer' ? district : undefined;

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete user (admin only)
router.delete('/:id',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.deleteOne();
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router; 