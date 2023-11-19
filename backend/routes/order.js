const express = require('express');
const router = express.Router();


const {getOrders,
  getOrdersId,
  createOrder,
  updateOrder,
  deleteOrder,
  getPastOrders,
  getCurrentOrders} = require('../controllers/order');
  
router.route('/').get(getOrders).post(createOrder);
router.route('/:id').patch(updateOrder).delete(deleteOrder);

// id => user
router.route('/past/:id').get(getPastOrders);
router.route('/current/:id').get(getCurrentOrders);
router.route('/user/:id').get(getOrdersId);

module.exports = router;