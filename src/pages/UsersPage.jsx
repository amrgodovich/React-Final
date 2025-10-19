import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorScreen from '../components/common/ErrorScreen';

const UsersPage = ({ onNavigate, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onBack={() => onNavigate('dashboard')} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onBack={() => onNavigate('dashboard')} backText="← Back to Dashboard" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm mt-2">{user.company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;