const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();

router.post('/addCategory', categoryController.addCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);
router.put('/updateCategory/:id', categoryController.updateCategory);
router.get('/getAllCategories', categoryController.getAllCategories);
router.get('/getCategory/:id', categoryController.getCategoryById);
router.get('/categories/getCategory/:id', categoryController.getCategoryById);

module.exports = router;
