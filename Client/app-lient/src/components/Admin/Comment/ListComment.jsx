import axios from 'axios';
import { useEffect, useState } from 'react';

const ListComment = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/comment/getAllComment');
        setComments(response.data);
      } catch (error) {
        setError('Lỗi khi lấy danh sách bình luận');
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Danh Sách Bình Luận</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <table className="min-w-full bg-white divide-y divide-gray-300">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Nội Dung</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Người Dùng</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <tr key={comment._id}>  {/* Sử dụng _id từ MongoDB làm key */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{comment._id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{comment.content}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{comment.user}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">Không có bình luận nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListComment;
