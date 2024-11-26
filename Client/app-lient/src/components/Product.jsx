import { useEffect, useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);

    // Lấy danh sách sản phẩm
    const fetchProducts = async (categoryId = '') => {
        try {
            const url = categoryId
                ? `http://localhost:3001/product/getProductsByCategory/${categoryId}`
                : 'http://localhost:3001/product/getAllProducts';
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    // Lấy danh sách danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/categories/getAllCategories');
                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };

        fetchCategories();
        fetchProducts(); // Mặc định hiển thị tất cả sản phẩm
    }, []);

    // Lọc sản phẩm theo danh mục
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        fetchProducts(categoryId);
    };

    // Thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async (product) => {
        try {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingProduct = cart.find(item => item.product._id === product._id);
            if (existingProduct) {
                // Nếu có, tăng số lượng
                setCart(cart.map(item => 
                    item.product._id === product._id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                ));
            } else {
                // Nếu chưa có, thêm mới vào giỏ hàng
                setCart([...cart, { product, quantity: 1 }]);
            }

            // Gửi yêu cầu API để thêm sản phẩm vào giỏ hàng
            await axios.post('http://localhost:3001/cart/addToCart', { productId: product._id, quantity: 1 });

            // Hiển thị thông báo thành công
            Swal.fire({
                title: 'Thành công!',
                text: 'Sản phẩm đã được thêm vào giỏ hàng.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
            });
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Không thể thêm sản phẩm vào giỏ hàng.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 w-full">
            {/* Danh mục */}
            <div className="bg-white p-6 shadow-xl rounded-lg mt-10 mb-8">
                <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">Danh Mục Sản Phẩm</h3>
                <div className="flex flex-wrap gap-6 justify-center">
                    <div
                        onClick={() => handleCategoryClick('')}
                        className={`py-3 px-6 rounded-lg text-center cursor-pointer ${
                            selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        } hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl`}
                    >
                        Tất cả
                    </div>
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            onClick={() => handleCategoryClick(category._id)}
                            className={`py-3 px-6 rounded-lg text-center cursor-pointer ${
                                selectedCategory === category._id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            } hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl`}
                        >
                            {category.username}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:bg-gray-50 p-4"
                    >
                        <div className="relative">
                            <Link to={`/product-details/${product._id}`}>
                                <img
                                    className="w-[200px] h-[200px] object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                                    src={product.image || 'https://via.placeholder.com/200'}
                                    alt={product.username}
                                />
                            </Link>
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                Giảm giá
                            </div>
                        </div>
                        <div className="p-4 text-center">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{product.username}</h2>
                            <span className="block text-xl font-semibold text-red-600">
                                {parseInt(product.price).toLocaleString('vi-VN')}₫
                            </span>
                            <div className="mt-4 flex gap-6 justify-center">
                                <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out">
                                    Mua ngay
                                </button>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
