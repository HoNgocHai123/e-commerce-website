import axios from 'axios';
import { useEffect, useState } from 'react';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/users');
        setUsers(response.data);
      } catch (error) {
        setError('Lỗi khi lấy danh sách người dùng');
      }
    };

    fetchUsers();
  }, []);

  

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Danh Sách Người Dùng</h1>

      <table className="min-w-full bg-white divide-y divide-gray-300">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.address}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 text-sm font-medium">
   
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">Không có người dùng nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListUsers;
