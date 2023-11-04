const express = require('express');
const router = express.Router();


const {getOrders,updateOrder,getOrdersId} = require('../controllers/order');

router.route('/').get(getOrders)
router.route('/:id').get(getOrdersId);
router.route('/update/:id').patch(updateOrder);

module.exports = router;