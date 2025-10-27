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

  function toggleTodo(todoId) {
    const copy = { ...todos };                 
    const list = copy[userId];                  

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === todoId) {
        list[i].completed = !list[i].completed; 
        break;
      }
    }

    setTodos(copy);                            
  };


  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onBack={() => onNavigate('users')} backText="Back to Users" />

      <div style={{ padding: "10px" }}>
        <div style={{ padding: "22px" }}>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <br />
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone: </strong>{user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-md shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-3">Posts</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {posts.map((post) => (
                <div key={post.id} className="border-b pb-2">
                  <h3 className="font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{post.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-md shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-3">To-Dos</h2>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {todos[userId]?.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-3 rounded text-sm cursor-pointer transition ${
                    todo.completed ? 'bg-green-100 line-through text-green-700' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {todo.title}
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