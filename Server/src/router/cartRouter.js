const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();

router.post('/addToCart', cartController.addToCart);
router.get('/getCartItems', cartController.getCartItems); // Route lấy giỏ hàng
router.delete('/removeFromCart/:id', cartController.removeFromCart);

module.exports = router;
