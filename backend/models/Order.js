const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true
  },
  products:[{
    productId:{
      type:mongoose.Types.ObjectId,
      ref:'Book',
      required:true
    },
    quantity:{
      type:Number,
      required:true,
    },
    price: {
      type:Number,
      required:true
    },
    _id:false
  }],
  total:{
     type:Number,
     required:true
  },
  shipping:{
    type:Object,
    required:true
  },
  status:{
    type:String,
    required:true,
    default:"Pending"
  }
},
{timestamps:true})


module.exports = mongoose.model('Order',OrderSchema);