const RehabCenter = require('../models/RehabCenter');

// @desc    Get all rehab centers
// @route   GET /api/rehab-centers
// @access  Public
exports.getAllRehabCenters = async (req, res) => {
  try {
    const { district, city, services, type } = req.query;
    
    // Build query
    const query = {};
    
    if (district) {
      query.district = district;
    }
    
    if (city) {
      query.city = city;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (services) {
      query.services = { $in: [services] };
    }
    
    const rehabCenters = await RehabCenter.find(query);
    
    res.json(rehabCenters);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single rehab center by ID
// @route   GET /api/rehab-centers/:id
// @access  Public
exports.getRehabCenterById = async (req, res) => {
  try {
    const rehabCenter = await RehabCenter.findById(req.params.id);
    
    if (rehabCenter) {
      res.json(rehabCenter);
    } else {
      res.status(404).json({ message: 'Rehab center not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new rehab center (admin only)
// @route   POST /api/rehab-centers
// @access  Admin
exports.createRehabCenter = async (req, res) => {
  try {
    const rehabCenter = await RehabCenter.create(req.body);
    res.status(201).json(rehabCenter);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a rehab center (admin only)
// @route   PUT /api/rehab-centers/:id
// @access  Admin
exports.updateRehabCenter = async (req, res) => {
  try {
    const rehabCenter = await RehabCenter.findById(req.params.id);
    
    if (rehabCenter) {
      const updatedRehabCenter = await RehabCenter.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      
      res.json(updatedRehabCenter);
    } else {
      res.status(404).json({ message: 'Rehab center not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a rehab center (admin only)
// @route   DELETE /api/rehab-centers/:id
// @access  Admin
exports.deleteRehabCenter = async (req, res) => {
  try {
    const rehabCenter = await RehabCenter.findById(req.params.id);
    
    if (rehabCenter) {
      await rehabCenter.remove();
      res.json({ message: 'Rehab center removed' });
    } else {
      res.status(404).json({ message: 'Rehab center not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}; 