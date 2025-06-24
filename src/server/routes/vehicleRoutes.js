import express from 'express';
import mongoose from 'mongoose';
import DeliveryPartner from '../models/DeliveryPartner.js';

const router = express.Router();

// POST /by-city
router.post('/by-city', async (req, res) => {
  console.log("Mongoose DB name:", mongoose.connection.name);
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const partners = await DeliveryPartner.find({
      city: city.toUpperCase().trim() // normalize for DB match
    });

    console.log("Looking for:", city.toUpperCase().trim());
    console.log("Found partners:", partners);

    res.json({ partners });
  } catch (error) {
    console.error("Error fetching vehicles", error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// GET /search
router.get('/search', async (req, res) => {
  const { city, vehicleType } = req.query;

  try {
    const vehicles = await DeliveryPartner.find({
      city,
      vehicle: vehicleType,
    });

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
});

export default router;
