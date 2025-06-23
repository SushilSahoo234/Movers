const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DeliveryPartner = require('../models/DeliveryPartner');
const Vehicle = require('../models/DeliveryPartner')
router.post('/by-city', async (req, res) => {
    console.log("Mongoose DB name:", mongoose.connection.name);
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const partners = await DeliveryPartner.find({
      city: city.toUpperCase().trim() // forcefully normalize to match DB
    });

    console.log("Looking for:", city.toUpperCase().trim());
    console.log("Found partners:", partners);

    res.json({ partners });
  } catch (error) {
    console.error("Error fetching vehicles", error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

router.get('/search', async (req, res) => {
  const { city, vehicleType } = req.query;
  try {
    const vehicle = await Vehicle.find({
      city,
      vehicle: vehicleType,
    });
    res.json(vehicle); // ✅ fix this line
  } catch (err) {
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
});

module.exports = router;