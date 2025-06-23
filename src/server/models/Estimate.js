const mongoose = require('mongoose')


const estimateSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    pickup:String,
    drop:String,
    userType:{type:String, enum:['Personal','Business']},
    service:{type:String, enum:['2 Wheeler','Truck','Packers and Movers','Intercity Courier']},
    estimateValue:Number,
    createdAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Estimate', estimateSchema);