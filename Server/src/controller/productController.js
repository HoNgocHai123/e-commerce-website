const Products = require("../model/product");
const path = require("path");
const cloudinary = require('cloudinary').v2;

const addProduct = async (req, res) => { 
    const { username, price, category, description } = req.body;
    try {
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // Lấy đường dẫn ảnh sau khi upload lên Cloudinary
        }

        const product = new Products({
            username,
            price,
            category,
            description,
            image: imageUrl // Lưu URL của ảnh
        });

        await product.save();
        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product." });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Xóa ảnh từ Cloudinary
        if (product.image) {
            const public_id = product.image.split('/').pop().split('.')[0]; // Lấy public_id từ URL của ảnh
            await cloudinary.uploader.destroy(public_id);
        }

        await Products.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product." });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { username, price, category, description } = req.body;
    try {
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        let imageUrl = product.image; // Giữ URL ảnh cũ
        if (req.file) {
            // Xóa ảnh cũ từ Cloudinary
            const public_id = product.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(public_id);

            // Upload ảnh mới lên Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // Lấy URL ảnh mới
        }

        product.username = username;
        product.price = price;
        product.category = category;
        product.description = description;
        product.image = imageUrl;

        await product.save();
        res.status(200).json({ message: "Product updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product." });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find().populate('category'); // Fetch all products with category info
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products." });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findById(id).populate('category'); // Tìm sản phẩm và lấy thông tin danh mục
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product." });
    }
};

const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await Products.find({ category: categoryId }).populate('category');
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found in this category." });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products by category." });
    }
};



module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory
};
