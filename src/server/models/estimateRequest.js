const mongoose = require('mongoose');

const estimateRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String},
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  userType: { type: String, enum: ['personal', 'business'], required: true },
  service: { type: String, required: true },
  city: { type: String },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EstimateRequest', estimateRequestSchema);
