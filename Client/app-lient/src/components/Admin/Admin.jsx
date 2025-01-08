import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Admin = () => {
  const [isDanhMucOpen, setDanhMucOpen] = useState(false);
  const [isSanPhamOpen, setSanPhamOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/users/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-3/12 h-full bg-gradient-to-b from-indigo-500 to-indigo-800 text-white p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Admin Dashboard
        </h2>
        <button
          className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>

        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                to="home"
                className="block py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md"
              >
                Trang Chủ
              </Link>
            </li>
            <li>
              <button
                className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md"
                onClick={() => setDanhMucOpen(!isDanhMucOpen)}
              >
                <span>Danh mục</span>
                {isDanhMucOpen ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </button>
              {isDanhMucOpen && (
                <ul className="mt-2 space-y-2 pl-4">
                  <li>
                    <Link
                      to="add-category"
                      className="block py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 shadow-sm"
                    >
                      AddDanhMuc
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="list-category"
                      className="block py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 shadow-sm"
                    >
                      ListDanhMuc
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md"
                onClick={() => setSanPhamOpen(!isSanPhamOpen)}
              >
                <span>Sản phẩm</span>
                {isSanPhamOpen ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </button>
              {isSanPhamOpen && (
                <ul className="mt-2 space-y-2 pl-4">
                  <li>
                    <Link
                      to="add-product"
                      className="block py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 shadow-sm"
                    >
                      AddSanPham
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="list-product"
                      className="block py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 shadow-sm"
                    >
                      ListSanPham
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="Users"
                className="block py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="comment"
                className="block py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md"
              >
                Comment
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-9/12 bg-white shadow-inner rounded-tl-3xl p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
