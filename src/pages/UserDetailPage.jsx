import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import LoadingScreen from '../components/common/LoadingScreen';

const UserDetailPage = ({ userId, onNavigate, todos, setTodos }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((r) => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((r) => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then((r) => r.json())
    ]).then(([userData, postsData, todosData]) => {
      setUser(userData);
      setPosts(postsData);
      if (!todos[userId]) {
        setTodos((prev) => ({ ...prev, [userId]: todosData }));
      }
      setLoading(false);
    });
  }, [userId, todos, setTodos]);

  const toggleTodo = (todoId) => {
    setTodos((prev) => ({
      ...prev,
      [userId]: prev[userId].map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onBack={() => onNavigate('users')} backText="← Back to Users" />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
          <p className="text-gray-600">{user.website}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts ({posts.length})</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <div key={post.id} className="border-b pb-4">
                  <h3 className="font-bold text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{post.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">To-Dos ({todos[userId]?.length || 0})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {todos[userId]?.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    todo.completed ? 'bg-green-100 line-through' : 'bg-gray-100'
                  }`}
                >
                  <p className={todo.completed ? 'text-green-700' : 'text-gray-800'}>
                    {todo.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;