const express = require('express');
const router = express.Router();
const estimateRequest = require('../models/estimateRequest');

router.post('/', async (req, res) => {
  try {
    const { name, phone, email, pickup, drop, userType, service, city } = req.body;

    const estimate = new estimateRequest({ name, phone, email, pickup, drop, userType, service, city });
    await estimate.save();

    res.status(201).json({ message: 'Estimate request recorded successfully' });
  } catch (err) {
    console.error('❌ Error saving estimate:', err);
    res.status(500).json({ message: 'Server error while saving estimate' });
  }
});

module.exports = router;
