import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/cart/getCartItems"
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));

    // Gửi yêu cầu API để xóa sản phẩm khỏi giỏ hàng
    axios.delete(`http://localhost:3001/cart/removeFromCart/${id}`);
  };

  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const totalAmount = cartItems
    .filter((item) => selectedItems.includes(item._id))
    .reduce((total, item) => total + item.quantity * item.product.price, 0);

  return (
    <div className="container mx-auto p-6">
      <Header />
      <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-8 mt-12">
        Giỏ Hàng
      </h2>
      {cartItems.length > 0 ? (
        <>
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase text-sm font-semibold">
                <th className="py-4 px-6 text-left border border-gray-200">
                  Chọn
                </th>
                <th className="py-4 px-6 text-left border border-gray-200">
                  STT
                </th>
                <th className="py-4 px-6 text-left border border-gray-200">
                  Hình ảnh
                </th>
                <th className="py-4 px-6 text-left border border-gray-200">
                  Tên sản phẩm
                </th>
                <th className="py-4 px-6 text-center border border-gray-200">
                  Số lượng
                </th>
                <th className="py-4 px-6 text-right border border-gray-200">
                  Giá
                </th>
                <th className="py-4 px-6 text-center border border-gray-200">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border border-gray-200 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleSelect(item._id)}
                    />
                  </td>
                  <td className="py-4 px-6 border border-gray-200 text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 border border-gray-200">
                    <img
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                      src={item.product.image || "https://via.placeholder.com/200"}
                      alt={item.product.username}
                    />
                  </td>
                  <td className="py-4 px-6 border border-gray-200 font-semibold text-gray-700">
                    {item.product.username}
                  </td>
                  <td className="py-4 px-6 text-center border border-gray-200 font-medium">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-6 text-right border border-gray-200 text-green-600 font-semibold">
                    {parseInt(item.product.price).toLocaleString("vi-VN")}₫
                  </td>
                  <td className="py-4 px-6 text-center border border-gray-200">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg transition-all duration-200"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="text-lg font-semibold text-gray-700">
              <span className="text-gray-600">Tổng tiền:</span>{" "}
              <span className="text-green-700 text-2xl">
                {totalAmount.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200">
             Đặt Hàng
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-xl text-gray-500 mt-12">
          Giỏ hàng của bạn đang trống.
        </p>
      )}
    </div>
  );
};

export default Cart;
