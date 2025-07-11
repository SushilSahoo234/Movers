// server.js or index.mjs (assuming "type": "module" in package.json)

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import saveEstimate from './routes/saveEstimate.js';
import getEstimate from './routes/getEstimate.js';
import bookingRoutes from './routes/bookingRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import estimateHandler from './routes/getEstimate.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/estimate', saveEstimate);
app.use('/api/estimate/fare', getEstimate);
app.use('/api/result', estimateHandler);
app.use('/api/delivery-partners', vehicleRoutes);

// MongoDB Connection
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});
