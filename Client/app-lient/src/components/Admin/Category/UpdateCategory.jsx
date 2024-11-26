import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Thêm SweetAlert2

const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/categories/getCategory/${id}`);
                setName(response.data.username);
                setLoading(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể lấy thông tin danh mục!',
                });
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3001/categories/updateCategory/${id}`, { username: name });
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Danh mục đã được cập nhật!',
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => navigate('/admin/List-category'), 2000);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Có lỗi xảy ra khi cập nhật danh mục!',
            });
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto mt-8 px-4 w-full">
            <h1 className="text-3xl font-bold text-center mb-6">Cập Nhật Danh Mục</h1>
            <div className="flex justify-center">
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Cập Nhật Danh Mục</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                                Tên Danh Mục
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên danh mục"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Cập Nhật Danh Mục
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
