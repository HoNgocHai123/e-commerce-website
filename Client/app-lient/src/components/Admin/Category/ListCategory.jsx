import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/categories/getAllCategories');
                setCategories(response.data);
            } catch (error) {
                setError('Lỗi khi lấy danh mục');
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Thao tác này sẽ xóa danh mục và không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626', // Đỏ đậm
            cancelButtonColor: '#6b7280', // Xám
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3001/categories/deleteCategory/${id}`);
                setCategories(categories.filter((category) => category._id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Đã xóa',
                    text: 'Danh mục đã được xóa thành công!',
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Có lỗi xảy ra khi xóa danh mục.',
                });
            }
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="p-6 bg-gray-50 rounded-xl shadow-lg mt-10">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Danh Sách Danh Mục</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
                    <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-semibold">
                        <tr>
                            <th className="px-8 py-4 text-left">ID</th>
                            <th className="px-8 py-4 text-left">Tên Danh Mục</th>
                            <th className="px-8 py-4 text-left">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category._id} className="transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg">
                                    <td className="px-8 py-4 text-sm font-medium text-gray-900">{category._id}</td>
                                    <td className="px-8 py-4 text-sm text-gray-700">{category.username}</td>
                                    <td className="px-8 py-4 text-sm font-medium">
                                        <Link
                                            to={`/admin/Update-category/${category._id}`}
                                            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
                                        >
                                            Cập nhật
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category._id)}
                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105 ml-4"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-8 py-4 text-center text-sm text-gray-500">Không có danh mục nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListCategory;
