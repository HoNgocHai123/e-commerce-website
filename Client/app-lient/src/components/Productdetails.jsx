import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/product/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/comment/getCommentsByProductId/${id}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchProduct();
        fetchComments();
    }, [id]);

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;

        try {
            const response = await axios.post(`http://localhost:3001/comment/addComment`, {
                productId: id,
                content: newComment,
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto p-4 mt-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div className="flex items-center justify-center">
                            <img
                                src={product.image || 'https://via.placeholder.com/200'}
                                alt={product.username}
                                className="w-[400px] h-auto"
                            />
                        </div>
                        <div className="mt-4 flex space-x-4">
                            {[
                                "https://anphat.com.vn/media/product/39055_iphone_13_pro_max___256gb___gold_mlld3vna_1.jpg",
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYokmx0WpsWo4RDaTWzrdUrtKO7gaPB-CCwg&s",
                                "https://anphat.com.vn/media/product/39055_iphone_13_pro_max___256gb___gold_mlld3vna_1.jpg",
                                "https://cdn2.cellphones.com.vn/x/media/catalog/product/d/o/download_4_1.png",
                            ].map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 border p-1"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">{product.username}</h1>
                        <p className="text-gray-500 mb-2">Danh mục: {product.category?.username || 'Không có danh mục'}</p>
                        
                        {/* Thêm phần ngôi sao đánh giá */}
                        <div className="flex items-center space-x-1 my-4">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                            <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
                            <FontAwesomeIcon icon={faStarRegular} className="text-yellow-400" />
                        </div>

                        <div className="flex items-center space-x-2 my-4">
                            <span className="text-3xl font-bold text-blue-600">
                                {Number(product.price).toLocaleString('vi-VN')}₫
                            </span>
                        </div>
                        <p className="mt-4 font-bold">Mô tả:</p>
                        <p className="text-gray-700">{product.description || 'Không có mô tả'}</p>
                        
                        <div className="mt-6">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full">
                                Chọn mua
                            </button>
                        </div>
                    </div>
                </div>

                {/* Phần bình luận */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Bình luận</h2>
                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <p>Chưa có bình luận nào.</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg">
                                    <p>{comment.content}</p>
                                    <span className="text-sm text-gray-500">- {comment.user || 'Khách'}</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mt-6">
                        <textarea
                            className="w-full p-2 border rounded-lg"
                            rows="4"
                            placeholder="Viết bình luận..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg">
                            Gửi bình luận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
