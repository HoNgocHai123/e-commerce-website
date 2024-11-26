import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Thêm thư viện SweetAlert2

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
        // Hiển thị thông báo xác nhận trước khi xóa
        const confirmDelete = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Thao tác này sẽ xóa danh mục và không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3001/categories/deleteCategory/${id}`);
                setCategories(categories.filter((category) => category._id !== id));
                // Hiển thị thông báo thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Đã xóa',
                    text: 'Danh mục đã được xóa thành công!',
                });
            } catch (error) {
                // Hiển thị thông báo lỗi
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
        <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Danh Sách Danh Mục</h1>

            <table className="min-w-full bg-white divide-y divide-gray-300">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Tên Danh Mục</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{category._id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{category.username}</td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <Link 
                                        to={`/admin/Update-category/${category._id}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Cập nhật
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-2"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">Không có danh mục nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListCategory;
