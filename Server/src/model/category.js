const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema); // Đảm bảo tên này là 'Category'

module.exports = Category;
