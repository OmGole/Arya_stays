const express = require('express');
const router = express.Router();

const {getCart,addToCart,deleteCart} = require('../controllers/cart');

router.route('/').get(getCart).post(addToCart);
router.route('/:productId').delete(deleteCart);

module.exports = router;