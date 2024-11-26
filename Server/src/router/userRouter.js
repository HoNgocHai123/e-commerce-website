const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/addUser', userController.addUser);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/users', userController.getAllUsers);


module.exports = router;