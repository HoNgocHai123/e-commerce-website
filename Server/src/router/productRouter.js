const express = require('express');
const productController = require('../controller/productController');
const uploadCloud = require('../middleware/authMiddleware'); // Sử dụng cấu hình Cloudinary

const router = express.Router();

router.post('/addProduct', uploadCloud.single('image'), productController.addProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.put('/updateProduct/:id', uploadCloud.single('image'), productController.updateProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/getProductsByCategory/:categoryId', productController.getProductsByCategory); // Route lấy sản phẩm theo id


module.exports = router;
