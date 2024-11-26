import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/product/getAllProducts"
        );
        setProducts(response.data);
      } catch (error) {
        setError("Lỗi Khi lấy Sản Phẩm");
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/product/deleteProduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError("Lỗi khi xóa Sản Phẩm");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        DANH SÁCH SẢN PHẨM
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Tên Sản Phẩm
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Hình Ảnh
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Mô Tả
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.username || "No Name"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.price || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt="Product"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.description || "No Description"}
                  </td>
                  <td className="px-6 py-4 text-sm flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
                      onClick={() => handleEdit(product._id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none"
                      onClick={() => handleDelete(product._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-sm text-gray-700 text-center"
                >
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            } rounded-full shadow hover:bg-blue-600`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
