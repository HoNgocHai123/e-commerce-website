const Comment = require('../model/comment');

const addComment = async (req, res) => {
    const { productId, content, user } = req.body;
    try {
        const comment = new Comment({ productId, content, user });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommentsByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        const comments = await Comment.find({ productId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllComment = async (req, res) => {
    try {
        const CommentAll = await Comment.find();
        res.status(200).json(CommentAll);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addComment,
    getCommentsByProductId,
    getAllComment
};

