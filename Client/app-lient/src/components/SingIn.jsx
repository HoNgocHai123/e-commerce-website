import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3001/users/login', formData);
      const { user } = response.data;

      setSuccess('Login successful!');
      
      // Lưu thông tin người dùng vào localStorage để sử dụng cho các component khác
      localStorage.setItem('user', JSON.stringify(user));

      // Kiểm tra email và điều hướng
      if (user.email === 'hongochaihnh1202@gmail.com') {
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex bg-white shadow-lg rounded-lg max-w-4xl w-full overflow-hidden">
          {/* Sign In Section */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign in</h2>
            <div className="flex space-x-4 justify-center mb-6">
              <a href="#" className="text-gray-500 text-2xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 text-2xl">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="text-gray-500 text-2xl">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <p className="text-gray-500 text-center mb-6">or use your account</p>

            {/* Form Đăng Nhập */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <div className="text-right mb-4">
                <a href="#" className="text-gray-500 hover:underline">Forgot your password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'SIGN IN'}
              </button>

              {/* Hiển thị thông báo lỗi hoặc thành công */}
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {success && (
                <div className="text-green-500 mt-4">
                  <p>{success}</p>
                </div>
              )}
            </form>
          </div>

          {/* Sign Up Section */}
          <div className="w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
            <p className="mb-8 text-center">
              Enter your personal details and start your journey with us
            </p>
            <button className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-pink-500 transition duration-300">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
