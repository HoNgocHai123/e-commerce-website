import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Nav from './Nav';

const Header = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/sign-in');
  };

  return (
    <div className=''>
      <div className=' p-4 bg-gray-100 shadow-md flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
        <div className='text-3xl font-bold'>
          <img className='w-[250px]' src='https://thietkewebwio.com/wp-content/uploads/website/Logo_thietkewebwio_com.png' alt='Ảnh Không có'></img>
        </div>

        {/* Search and Button Section */}
        <div className='flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto'>
          <input
            type='text'
            className='px-4 py-2 w-full md:w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Search...'
          />
          <button className='bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-500'>
            Tìm Kiếm
          </button>
        </div>

        {/* Actions Section */}
        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto'>
          <div className='flex items-center space-x-2'>
            <FontAwesomeIcon icon={faHeart} className="text-red-500" />
            <span>Yêu Thích</span>
          </div>
          <div className='flex items-center space-x-2'>
            <FontAwesomeIcon icon={faShoppingCart} className="text-blue-500" />
            <span><Link to="/Cart">Giỏ Hàng</Link></span>
          </div>
          <div className='relative ml-7'>
            <img
              className='w-9 bg-[#c4c4c5] rounded-[55%] cursor-pointer'
              src='https://png.pngtree.com/png-clipart/20240323/original/pngtree-user-avatar-silhouette-png-image_14659404.png'
              alt='User Avatar'
              onClick={() => setShowProfileOptions(!showProfileOptions)}
            />
            {showProfileOptions && (
              <div className='absolute w-[150px] h-[140px] right-0 mt-2 bg-white shadow-lg rounded-lg p-4 border border-gray-300'>
                <div className='flex flex-col items-center'>
                  {user ? (
                    <>
                      <span className='text-sm font-semibold mb-2 text-gray-800'>{user.username}</span>
                      <button
                        className='w-full text-sm px-4 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-300'
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/sign-in" className='w-full text-sm font-semibold mb-2 bg-[#f87171] text-gray-800 block text-center py-2 px-4 rounded-lg hover:bg-[#dc2626] transition-colors duration-300'>Đăng nhập</Link>
                      <Link to="/register" className='w-full text-sm font-semibold mb-2 bg-[#60a5fa] text-gray-800 block text-center py-2 px-4 rounded-lg hover:bg-[#2563eb] transition-colors duration-300'>Đăng ký</Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default Header;
