const express = require('express')
const axios = require('axios')
const router = express.Router();

const ORS_API_KEY = '5b3ce3597851110001cf6248f7083ef817574bfb8873e3d62e82c831'

router.post('/result', async(req,res) => {
    const {start,end} = req.body;
    if(!start || !end){
        return res.status(400).json({error:'Start and end coordinates are required'})
    }
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${start}&end=${end}`;

    try {
        const response = await axios.get(url);
        const segment = response.data?.features?.[0]?.properties?.segments?.[0]; 

        if(!segment){
            return res.status(500).json({error:"Invalid route data from OpenRouteService"})
        }
        const {distance, duration} = segment;
        res.json({
            distanceKm: (distance/1000).toFixed(2),
            duration: Math.ceil(duration/60),
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({error: 'Failed to fetch estimate'});
    }
});
module.exports = router;