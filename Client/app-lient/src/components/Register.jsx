import { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await axios.post('http://localhost:3001/users/addUser', formData);
      setSuccess('Registration successful!');
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        date: '',
      });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex bg-white shadow-lg rounded-lg max-w-4xl w-full overflow-hidden">
          {/* Form Đăng Ký */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
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
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date of Birth"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            {/* Thông báo */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </div>

          {/* Phần giới thiệu */}
          <div className="w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-8 text-center">Sign in to keep connected with us</p>
            <button className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-pink-500 transition duration-300">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
