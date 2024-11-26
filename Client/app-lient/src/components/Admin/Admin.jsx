import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Admin = () => {
  const [isDanhMucOpen, setDanhMucOpen] = useState(false);
  const [isSanPhamOpen, setSanPhamOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/users/logout');
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex ">
      <div className="w-3/12 h-full p-4 bg-gray-50 border-r border-gray-300">
        <button
          className="w-full flex items-center justify-center p-3 mt-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>

        <ul className="space-y-2 mt-4">
          <li>
            <Link to="home" className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300">Trang Chủ</Link>
          </li>
          <li>
            <button
              className="w-full text-left p-3 flex items-center justify-between bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              onClick={() => setDanhMucOpen(!isDanhMucOpen)}
            >
              <span className="text-gray-800">Danh mục</span>
              {isDanhMucOpen ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {isDanhMucOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link to="add-category" className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300">AddDanhmuc</Link>
                </li>
                <li>
                  <Link to="list-category" className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300">ListDanhMuc</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="w-full text-left p-3 flex items-center justify-between bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              onClick={() => setSanPhamOpen(!isSanPhamOpen)}
            >
              <span className="text-gray-800">Sản phẩm</span>
              {isSanPhamOpen ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {isSanPhamOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link to="add-product" className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300">AddSanPham</Link>
                </li>
                <li>
                  <Link to="list-product" className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300">ListSanPham</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="Users" className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300">Users</Link>
          </li>
          <li>
            <Link to="comment" className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300">Comment</Link>
          </li>
        </ul>
      </div>

      <div className="w-9/12 p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
