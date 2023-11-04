const Order = require('../models/Order');


const getOrders = async (req,res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
}


const getOrdersId = async (req,res) => {
  const {id} = req.params;
  const orders = await Order.find({userId:id});
  res.status(200).json(orders);
}


const updateOrder = async (req,res) => {
  const {id} = req.params;
  console.log(req.body);
  const order = await Order.findOneAndUpdate({_id:id},req.body,{
    new:true,
  });
  if(!order) {
    return res.status(404).json({msg:`No task with id : ${id}`});
  }
  return res.status(200).json(order);
}



module.exports = {
  getOrders,
  getOrdersId,
  updateOrder,
}
