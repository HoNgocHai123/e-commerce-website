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
    .reduce(
      (total, item) => total + (item.quantity || 0) * (item.product?.price || 0),
      0
    );

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Giỏ Hàng
        </h2>
        <div className="flex gap-4">
          {/* Cột đầu tiên: Danh sách giỏ hàng */}
          <div className="w-2/3">
            {cartItems.length > 0 ? (
              <>
                <table className="w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 text-sm font-medium">
                      <th className="py-3 px-4 text-center border-b">Chọn</th>
                      <th className="py-3 px-4 text-left border-b">STT</th>
                      <th className="py-3 px-4 text-left border-b">Hình ảnh</th>
                      <th className="py-3 px-4 text-left border-b">
                        Tên sản phẩm
                      </th>
                      <th className="py-3 px-4 text-center border-b">
                        Số lượng
                      </th>
                      <th className="py-3 px-4 text-right border-b">Giá</th>
                      <th className="py-3 px-4 text-center border-b">Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item._id)}
                            onChange={() => handleSelect(item._id)}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">{index + 1}</td>
                        <td className="py-3 px-4">
                          <img
                            src={
                              item.product?.image ||
                              "https://via.placeholder.com/50"
                            }
                            alt={item.product?.username || "Sản phẩm"}
                            className="w-14 h-14 object-cover rounded"
                          />
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          {item.product?.username || "Không xác định"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {item.quantity || 0}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {parseInt(item.product?.price || 0).toLocaleString(
                            "vi-VN"
                          )}
                          ₫
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-800 font-medium">
                    Tổng tiền:{" "}
                    <span className="font-bold text-gray-900">
                      {totalAmount.toLocaleString("vi-VN")}₫
                    </span>
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
                    Thanh Toán
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500 mt-8">
                Giỏ hàng của bạn đang trống.
              </p>
            )}
          </div>

          {/* Cột thứ hai: Để trống */}
          <div className="w-1/3">
            {/* Nội dung tùy chỉnh cho cột này */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
