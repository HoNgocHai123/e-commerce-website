const Cart = require('../model/cart');
const Product = require('../model/product');

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const cartItem = new Cart({ product: productId, quantity });
        await cartItem.save();

        res.status(201).json({ message: 'Added to cart successfully!', cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to cart.' });
    }
};



const getCartItems = async (req, res) => {
    try {
        // Populate 'product' để lấy thông tin sản phẩm
        const cartItems = await Cart.find().populate('product'); // 'product' thay vì 'Products'
        console.log(cartItems);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items.' });
    }
};



// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await Cart.findByIdAndDelete(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }
        res.status(200).json({ message: 'Removed from cart successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing cart item.' });
    }
};

module.exports = { addToCart, getCartItems, removeFromCart };
