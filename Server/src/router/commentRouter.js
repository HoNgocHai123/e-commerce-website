const express = require('express');
const commentController = require('../controller/commentController');

const router = express.Router();

// Định nghĩa route để thêm bình luận
router.post('/addComment', commentController.addComment);
router.get('/getCommentsByProductId/:productId', commentController.getCommentsByProductId);
router.get('/getAllComment', commentController.getAllComment);
router.delete('/deleteComment/:id', commentController.deleteComment);


module.exports = router;
