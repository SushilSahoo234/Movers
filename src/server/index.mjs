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
import estimateHandler from './routes/getEstimate.js'; // Naming fixed for clarity
import vehicleRoutes from './routes/vehicleRoutes.js';
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(cors({
  origin: "https://movers-1-t9u3.onrender.com"
}));
app.use(express.json()); // to parse JSON request bodies

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/estimate', saveEstimate);
app.use('/api/estimate/fare', getEstimate);
app.use('/api/result', estimateHandler);
app.use('/api/delivery-partners', vehicleRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

  import path from 'path';
import { fileURLToPath } from 'url';

// For ES modules to use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
