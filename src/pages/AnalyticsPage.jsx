import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import LoadingScreen from '../components/common/LoadingScreen';

const AnalyticsPage = ({ onNavigate }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then((r) => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then((r) => r.json()),
      fetch('https://jsonplaceholder.typicode.com/todos').then((r) => r.json())
    ]).then(([users, posts, todos]) => {
      const userStats = users.map((user) => {
        const userPosts = posts.filter((p) => p.userId === user.id);
        const userTodos = todos.filter((t) => t.userId === user.id);
        const completedTodos = userTodos.filter((t) => t.completed);
        
        return {
          username: user.username,
          postsCount: userPosts.length,
          todosCount: userTodos.length,
          completedTodosCount: completedTodos.length
        };
      });

      const mostPosts = userStats.reduce((max, u) => u.postsCount > max.postsCount ? u : max);
      const fewestPosts = userStats.reduce((min, u) => u.postsCount < min.postsCount ? u : min);
      const mostCompleted = userStats.reduce((max, u) => u.completedTodosCount > max.completedTodosCount ? u : max);
      const fewestCompleted = userStats.reduce((min, u) => u.completedTodosCount < min.completedTodosCount ? u : min);

      setStats({
        totalUsers: users.length,
        mostPosts,
        fewestPosts,
        mostCompleted,
        fewestCompleted
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  const StatBox = ({ title, username, count, color }) => (
    <div className={`${color} rounded-lg p-6 text-white shadow-lg`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{username}</p>
      <p className="text-sm mt-2">{count} items</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onBack={() => onNavigate('dashboard')} backText="← Back to Dashboard" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <h2 className="text-5xl font-bold text-blue-600">{stats.totalUsers}</h2>
          <p className="text-gray-600 text-lg mt-2">Total Users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatBox
            title="Most Posts"
            username={stats.mostPosts.username}
            count={stats.mostPosts.postsCount}
            color="bg-green-500"
          />
          <StatBox
            title="Fewest Posts"
            username={stats.fewestPosts.username}
            count={stats.fewestPosts.postsCount}
            color="bg-blue-500"
          />
          <StatBox
            title="Most Completed To-Dos"
            username={stats.mostCompleted.username}
            count={stats.mostCompleted.completedTodosCount}
            color="bg-purple-500"
          />
          <StatBox
            title="Fewest Completed To-Dos"
            username={stats.fewestCompleted.username}
            count={stats.fewestCompleted.completedTodosCount}
            color="bg-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;