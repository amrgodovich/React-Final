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
    <div className="min-h-screen bg-gray-50">
      <Navbar onBack={() => onNavigate('dashboard')} backText="Back to Dashboard" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Users List</h1>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">{user.company.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
