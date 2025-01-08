import { useState, useEffect } from 'react';
import axios from 'axios';

const AddProducts = () => {
  const [product, setProduct] = useState({
    username: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleCategoryClick = (categoryId) => {
    setProduct((prevState) => ({
      ...prevState,
      category: categoryId,
    }));
    setShowCategories(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-fA-F0-9]{24}$/.test(product.category)) {
      setError('Danh mục không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    const formData = new FormData();
    formData.append('username', product.username);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('description', product.description);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      setError(null); 
      setSuccess(null); 

      const response = await axios.post('http://localhost:3001/product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Thêm sản phẩm thành công!');
      setProduct({ username: '', price: '', category: '', description: '', image: null });
    } catch (error) {
      setError('Lỗi khi thêm sản phẩm. Vui lòng kiểm tra lại.');
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Thêm Sản Phẩm</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Thông Tin Sản Phẩm</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Tên Sản Phẩm</label>
            <input
              type="text"
              id="username"
              name="username"
              value={product.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Giá</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập giá"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Danh Mục</label>
            <input
              type="text"
              id="category"
              name="category"
              value={categories.find(category => category._id === product.category)?.username || ''}
              onClick={() => setShowCategories(!showCategories)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              placeholder="Chọn danh mục"
              readOnly
            />
            {showCategories && (
              <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className="px-4 py-2 hover:bg-indigo-200 cursor-pointer transition duration-200"
                  >
                    {category.username}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Hình Ảnh</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Mô Tả</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mô tả"
              rows="3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Thêm Sản Phẩm
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
        {success && <p className="text-green-600 mt-4 text-sm">{success}</p>}
      </div>
    </div>
  );
};

export default AddProducts;
