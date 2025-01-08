import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Tên danh mục không được để trống",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/categories/addCategory",
        {
          username: categoryName,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Danh mục đã được thêm thành công!",
        });
        setCategoryName("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4 w-full">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
        Thêm Danh Mục
      </h1>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-indigo-300">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">
            Thông Tin Danh Mục
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-indigo-700 text-sm font-medium mb-2"
              >
                Tên Danh Mục
              </label>
              <input
                type="text"
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all"
                placeholder="Nhập tên danh mục"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Thêm Danh Mục
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
