import { useEffect, useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {  FaEllipsisH } from 'react-icons/fa';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/categories/getAllCategories');
                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/product/getAllProducts');
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const handleCategoryClick = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const url = categoryId 
                ? `http://localhost:3001/product/getProductsByCategory/${categoryId}`
                : 'http://localhost:3001/product/getAllProducts';
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            setCart(prevCart => {
                const existingProduct = prevCart.find(item => item.product._id === product._id);
                if (existingProduct) {
                    return prevCart.map(item =>
                        item.product._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prevCart, { product, quantity: 1 }];
            });

            await axios.post('http://localhost:3001/cart/addToCart', { productId: product._id, quantity: 1 });
            Swal.fire('Thành công!', 'Sản phẩm đã được thêm vào giỏ hàng.', 'success');
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            Swal.fire('Lỗi!', 'Không thể thêm sản phẩm vào giỏ hàng.', 'error');
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="max-w-7xl mx-auto p-6 w-full">
            <div className="bg-white p-6 shadow-xl rounded-lg mt-10 mb-8">
                <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">Danh Mục Sản Phẩm</h3>
                <div className="flex justify-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md">
                        <FaEllipsisH size={24} />
                    </button>
                </div>
                {isOpen && (
                    <div className="flex flex-wrap gap-6 justify-center mt-4">
                        <div onClick={() => handleCategoryClick('')} className={`py-3 px-6 rounded-lg cursor-pointer ${selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Tất cả</div>
                        {categories.map(category => (
                            <div key={category._id} onClick={() => handleCategoryClick(category._id)} className={`py-3 px-6 rounded-lg cursor-pointer ${selectedCategory === category._id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{category.username}</div>
                        ))}
                    </div>
                )}
            </div>

            <Slider {...settings}>
                {products.map(product => (
                    <div key={product._id} className="p-2 w-[160px]">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center">
                            <div className="relative w-[140px] h-[140px]">
                                <Link to={`/product-details/${product._id}`}>
                                    <img className="w-full h-full object-cover rounded-md" src={product.image || 'https://via.placeholder.com/140'} alt={product.username} />
                                </Link>
                                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">Giảm giá</div>
                            </div>
                            <div className="p-2 text-center w-full">
                                <h2 className="text-sm font-bold text-gray-800 truncate">{product.username}</h2>
                                <span className="block text-sm font-semibold text-red-600">{parseInt(product.price).toLocaleString('vi-VN')}₫</span>
                                <button onClick={() => handleAddToCart(product)} className="px-3 py-1 mt-2 bg-teal-500 text-white text-xs font-semibold rounded-md shadow-md hover:bg-teal-600">
                                    <FontAwesomeIcon icon={faShoppingCart} /> Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Product;
