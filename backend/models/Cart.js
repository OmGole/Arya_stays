const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
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
  bill: {
    type: Number,
    required: true,
  }
})


module.exports = mongoose.model('Cart',CartSchema);