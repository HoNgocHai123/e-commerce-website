import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className=' bg-gray-900 text-white p-4 shadow-lg'>
      <div className='container mx-auto flex items-center space-x-14'>
        
        <ul className='flex space-x-6'>
          <li>
            <Link 
              to="/" 
              className='hover:text-yellow-300 transition-colors duration-300 text-lg font-medium'
            >
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link 
              to="/gioi-thieu" 
              className='hover:text-yellow-300 transition-colors duration-300 text-lg font-medium'>
              Giới Thiệu
            </Link>
          </li>
          <li>
            <Link 
              to="/gop-y" 
              className='hover:text-yellow-300 transition-colors duration-300 text-lg font-medium'>
              Góp Ý
            </Link>
          </li>
          <li>
            <Link 
              to="/lien-he" 
              className='hover:text-yellow-300 transition-colors duration-300 text-lg font-medium'>
              Liên Hệ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
