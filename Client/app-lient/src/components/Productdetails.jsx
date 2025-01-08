import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const ProductDetails = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [product, setProduct] = useState(null); // Dữ liệu sản phẩm
    const [comments, setComments] = useState([]); // Dữ liệu bình luận
    const [newComment, setNewComment] = useState(''); // Nội dung bình luận mới

    // Lấy thông tin sản phẩm và bình luận
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, commentsRes] = await Promise.all([
                    axios.get(`http://localhost:3001/product/products/${id}`),
                    axios.get(`http://localhost:3001/comment/getCommentsByProductId/${id}`),
                ]);
                setProduct(productRes.data);
                setComments(commentsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    // Gửi bình luận mới
    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return; // Kiểm tra nội dung rỗng

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

    // Xóa bình luận
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:3001/comment/deleteComment/${commentId}`);
            setComments(comments.filter((comment) => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Hiển thị "Loading..." khi dữ liệu chưa tải xong
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto p-4 mt-14">
                {/* Chi tiết sản phẩm */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hình ảnh sản phẩm */}
                    <div>
                        <div className="flex items-center justify-center">
                            <img
                                src={product.image || 'https://via.placeholder.com/200'}
                                alt={product.username}
                                className="w-[400px] h-auto"
                            />
                        </div>
                        <div className="mt-4 flex space-x-4">
                            {/* Hình ảnh thu nhỏ */}
                            {product?.thumbnails?.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 border p-1"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div>
                        <h1 className="text-2xl font-bold">{product.username}</h1>
                        <p className="text-gray-500 mb-2">
                            Danh mục: {product.category?.username || 'Không có danh mục'}
                        </p>
                        
                        {/* Ngôi sao đánh giá */}
                        <div className="flex items-center space-x-1 my-4">
                            {[...Array(3)].map((_, i) => (
                                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                            ))}
                            <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
                            <FontAwesomeIcon icon={faStarRegular} className="text-yellow-400" />
                        </div>

                        {/* Giá sản phẩm */}
                        <div className="flex items-center space-x-2 my-4">
                            <span className="text-3xl font-bold text-blue-600">
                                {Number(product.price).toLocaleString('vi-VN')}₫
                            </span>
                        </div>

                        {/* Mô tả */}
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
                    <h2 className="text-2xl font-semibold mb-6">Bình luận</h2>
                    <div className="space-y-6">
                        {comments.length === 0 ? (
                            <p className="text-gray-500">Chưa có bình luận nào.</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment._id} className="flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-lg font-medium text-gray-800">{comment.content}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-sm text-gray-500">- {comment.user || 'Khách'}</span>
                                        <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="text-red-500 text-sm hover:text-red-600 transition-colors">
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Form để thêm bình luận */}
                    <div className="mt-8 space-y-4">
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            rows="4"
                            placeholder="Viết bình luận..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            Gửi bình luận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
