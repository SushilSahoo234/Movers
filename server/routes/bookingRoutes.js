const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings');
const Vehicle = require('../models/DeliveryPartner');
const nodemailer = require('nodemailer');


router.post('/book', async (req, res) => {
    try {
        console.log("🔥 Incoming booking request:", req.body);

        const { user, vehicleId, pickupLocation, dropLocation } = req.body;

        if (!user || !user.name || !user.email || !user.phone || !pickupLocation || !dropLocation) {
            console.log("❌ Missing fields");
            return res.status(400).json({ message: 'Missing required user or location fields' });
        }

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            console.log("❌ Vehicle not found");
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const booking = new Booking({
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                pickupLocation,
                dropLocation,
            },
            vehicle: {
                type: vehicle.type,
                vehicleId: vehicle._id,
            },
            status: 'pending',
            bookedAt: new Date()
        });

        await booking.save();
        console.log("✅ Booking saved:", booking);

        res.status(201).json({ message: 'Booking request sent successfully', booking });

    } catch (err) {
        console.error("🔥 Error in /book:", err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
router.patch('/update-status/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId.trim(); 
        let { status } = req.body;

        console.log('🔥 PATCH /update-status route hit');
        console.log('Raw status:', status);
        if (typeof status !== 'string') {
            return res.status(400).json({ message: 'Status must be a string' });
        }

        status = status.trim().toLowerCase();

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (err) {
        console.error('❌ Error updating booking status:', err);
        res.status(500).json({ message: 'Error updating booking status' });
    }
});
module.exports = router;