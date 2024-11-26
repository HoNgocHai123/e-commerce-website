const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", 
        required: true
    },
    image: {
        type: String, // Lưu URL của ảnh từ Cloudinary
        required: false
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
