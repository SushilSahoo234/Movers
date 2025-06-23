const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user:{
        name:String,
        email:String,
        phone:String,
        pickupLocation:String,
        dropLocation:String,
    },
    vehicle:{
        type:{
            type:String,
            required: true,
        },
        vehicleId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vehicle',
            required:true
        },
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    bookedAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Booking', bookingSchema);