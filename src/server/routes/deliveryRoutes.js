const express = require('express')
const router = express.Router();
const DeliveryPartner = require('../models/DeliveryPartner');


router.post('/', async(req,res) => {
    try{
        const{name, phone, city, vehicle, source} = req.body;

        if(!name || !phone || !city || !vehicle || !source){
            return res.status(400).json({error:'All fields are required'});
        }
        const partner = new DeliveryPartner({name, phone, city, vehicle, source});
        await partner.save();

        res.status(201).json({message: 'Partner registered successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
});
module.exports = router;