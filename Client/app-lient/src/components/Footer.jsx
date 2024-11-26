const Footer = () => {
    return (
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Giới Thiệu</h3>
            <ul>
              <li><a href="#" className="hover:underline">Trang Chủ</a></li>
              <li><a href="#" className="hover:underline">Giới Thiệu</a></li>
              <li><a href="#" className="hover:underline">Dịch Vụ</a></li>
              <li><a href="#" className="hover:underline">Liên Hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Dịch Vụ Khách Hàng</h3>
            <ul>
              <li><a href="#" className="hover:underline">Hỗ Trợ Kỹ Thuật</a></li>
              <li><a href="#" className="hover:underline">Trung Tâm Bảo Hành</a></li>
              <li><a href="#" className="hover:underline">Chính Sách Đổi Trả</a></li>
              <li><a href="#" className="hover:underline">Giao Hàng</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Thông Tin</h3>
            <ul>
              <li><a href="#" className="hover:underline">Điều Khoản Sử Dụng</a></li>
              <li><a href="#" className="hover:underline">Chính Sách Quyền Riêng Tư</a></li>
              <li><a href="#" className="hover:underline">Chính Sách Bảo Mật</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Theo Dõi Chúng Tôi</h3>
            <ul>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default Footer;
  