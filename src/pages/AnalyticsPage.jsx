import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import LoadingScreen from '../components/common/LoadingScreen';

function AnalyticsPage({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/todos').then(r => r.json())
    ])
      .then(([users, posts, todos]) => {
        let userStats = [];

        for (let i = 0; i < users.length; i++) {
          const u = users[i];
          const userPosts = posts.filter(p => p.userId === u.id);
          const userTodos = todos.filter(t => t.userId === u.id);
          const completed = userTodos.filter(t => t.completed);

          userStats.push({
            username: u.username,
            postsCount: userPosts.length,
            todosCount: userTodos.length,
            completedTodosCount: completed.length
          });
        }

        let mostPosts = userStats[0];
        let fewestPosts = userStats[0];
        let mostCompleted = userStats[0];
        let fewestCompleted = userStats[0];

        for (let i = 1; i < userStats.length; i++) {
          const u = userStats[i];
          if (u.postsCount > mostPosts.postsCount){
              mostPosts = u;
              }
          if (u.postsCount < fewestPosts.postsCount){
              fewestPosts = u;
              }
          if (u.completedTodosCount > mostCompleted.completedTodosCount){
              mostCompleted = u;
              }
          if (u.completedTodosCount < fewestCompleted.completedTodosCount){
              fewestCompleted = u;
              }
        }

        setStats({
          totalUsers: users.length,
          mostPosts,
          fewestPosts,
          mostCompleted,
          fewestCompleted
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
    }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onBack={() => onNavigate('dashboard')} backText="Back to Dashboard" />

      <div className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">Analytics</h1>

        <div className="bg-white rounded-md shadow p-5 mb-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">{stats.totalUsers}</h2>
          <p className="text-gray-600 mt-2 text-sm">Total Users</p>
        </div>

        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded">
            <h3 className="font-semibold text-gray-800">Most Posts</h3>
            <p>{stats.mostPosts.username} : {stats.mostPosts.postsCount} posts</p>
          </div>

          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold text-gray-800">Fewest Posts</h3>
            <p>{stats.fewestPosts.username} : {stats.fewestPosts.postsCount} posts</p>
          </div>

          <div className="bg-purple-100 p-4 rounded">
            <h3 className="font-semibold text-gray-800">Most Completed To-Dos</h3>
            <p>{stats.mostCompleted.username} : {stats.mostCompleted.completedTodosCount} done</p>
          </div>

          <div className="bg-orange-100 p-4 rounded">
            <h3 className="font-semibold text-gray-800">Fewest Completed To-Dos</h3>
            <p>{stats.fewestCompleted.username} : {stats.fewestCompleted.completedTodosCount} done</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
