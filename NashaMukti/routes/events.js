const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const { auth, checkRole } = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Create event
router.post('/',
  auth,
  checkRole(['admin', 'block_officer']),
  upload.array('images', 5),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('district').trim().notEmpty().withMessage('District is required'),
    body('date').isISO8601().toDate().withMessage('Valid date is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, location, district, date } = req.body;

      // Upload images to Cloudinary
      const imageUploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'events' },
            (error, result) => {
              if (error) reject(error);
              else resolve({ url: result.secure_url, publicId: result.public_id });
            }
          );

          stream.end(file.buffer);
        });
      });

      const images = await Promise.all(imageUploadPromises);

      const event = new Event({
        title,
        description,
        location,
        district,
        date,
        images,
        createdBy: req.user._id
      });

      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all events with filters
router.get('/', async (req, res) => {
  try {
    const { district, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (district) {
      query.district = district;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event
router.put('/:id',
  auth,
  checkRole(['admin', 'block_officer']),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if user is authorized to update
      if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete event
router.delete('/:id',
  auth,
  checkRole(['admin', 'block_officer']),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if user is authorized to delete
      if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      // Delete images from Cloudinary
      const deletePromises = event.images.map(image => 
        cloudinary.uploader.destroy(image.publicId)
      );
      await Promise.all(deletePromises);

      await event.deleteOne();
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router; 