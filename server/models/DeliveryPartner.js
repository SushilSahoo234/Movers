const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  vehicle: { type: String, required: true },
  source: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
