const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true
  },
  propertyId:{
    type:mongoose.Types.ObjectId,
    ref:'Property',
    required:true
  },
  status:{
    type:String,
    enum : ['accepted','pending','rejected'],
    default:"pending"
  },
  amenities:[
    {type:{type:String},
    value:{type:String},
    price:{type:Number},
    _id:false
  }],
  guest:{
    adult: {type: Number},
    children: {type: Number},
  },
  accomodation:{
    type:String,
    required:true
  },
  check_in:{
    type:Date,
    required:true,
  },
  check_out:{
    type:Date,
    required:true,
  }
},
{timestamps:true})


module.exports = mongoose.model('Order',OrderSchema);