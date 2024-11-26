import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState({
    username: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Lấy danh sách danh mục từ API
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

  // Lấy thông tin sản phẩm hiện tại khi component được render
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/products/${id}`);
        setProduct({
          username: response.data.username,
          price: response.data.price,
          category: response.data.category,
          description: response.data.description,
          image: null, // Không cần gán lại image từ response
        });
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Xử lý khi người dùng nhập dữ liệu vào form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Xử lý khi người dùng tải lên file hình ảnh
  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  // Xử lý khi người dùng chọn danh mục
  const handleCategoryClick = (categoryId) => {
    setProduct((prevState) => ({
      ...prevState,
      category: categoryId,
    }));
    setShowCategories(false);
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem ID danh mục có phải là ObjectId hợp lệ không
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
      formData.append('image', product.image); // Nếu người dùng có chọn ảnh mới, gửi lên API
    }

    try {
      setError(null); // Reset error trước mỗi lần submit
      setSuccess(null); // Reset success trước mỗi lần submit

      await axios.put(`http://localhost:3001/product/updateProduct/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Cập nhật sản phẩm thành công!');
      
      
      setProduct({
        username: '',
        price: '',
        category: '',
        description: '',
        image: null,
      });
      setShowCategories(false); 
      
    } catch (error) {
      setError('Lỗi khi cập nhật sản phẩm. Vui lòng kiểm tra lại.');
      console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4 w-[1400px] max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Cập Nhật Sản Phẩm</h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-6">Chỉnh Sửa Sản Phẩm</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 text-base font-medium mb-3">
              Tên Sản Phẩm
            </label>
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
          <div className="mb-6">
            <label htmlFor="price" className="block text-gray-700 text-base font-medium mb-3">Giá</label>
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
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 text-base font-medium mb-3">Danh Mục</label>
            <div className="relative">
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
                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      onClick={() => handleCategoryClick(category._id)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {category.username}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 text-base font-medium mb-3">Hình Ảnh</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-base font-medium mb-3">Mô Tả</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mô tả"
              rows="6"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cập Nhật Sản Phẩm
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default UpdateProduct;
