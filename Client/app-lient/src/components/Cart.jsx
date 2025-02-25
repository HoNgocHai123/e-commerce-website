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
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
              <h2 className="text-xl font-bold mb-4">THÔNG TIN KHÁCH HÀNG</h2>

              {/* Thông tin khách hàng */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center">
                    <input type="radio" name="gender" className="mr-2" /> Anh
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="gender" className="mr-2" /> Chị
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2">Họ và tên *</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Số điện thoại *</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>
              </div>

              {/* Hình thức giao hàng */}
              <h2 className="text-xl font-bold mb-4">HÌNH THỨC GIAO HÀNG</h2>
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center">
                    <input type="radio" name="delivery" className="mr-2" /> Giao hàng tận nơi
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="delivery" className="mr-2" /> Nhận hàng tại cửa hàng
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-2">Tỉnh thành *</label>
                    <select className="w-full border border-gray-300 p-2 rounded-md">
                      <option>Hồ Chí Minh</option>
                      <option>Hà Nội</option>
                      <option>Đà Nẵng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Quận huyện *</label>
                    <select className="w-full border border-gray-300 p-2 rounded-md">
                      <option>Chọn quận / huyện</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Phường xã *</label>
                  <select className="w-full border border-gray-300 p-2 rounded-md">
                    <option>Chọn phường / xã</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Tên đường / số nhà</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Nhập tên đường / số nhà"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Yêu cầu khác (nếu có)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Nhập yêu cầu"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Gọi người khác nhận hàng (Nếu có)
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Xuất hóa đơn công ty
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
