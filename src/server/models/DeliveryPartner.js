import mongoose from 'mongoose';

const deliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  vehicle: { type: String, required: true },
  source: { type: String, required: true }
}, { timestamps: true });

const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);

export default DeliveryPartner;
