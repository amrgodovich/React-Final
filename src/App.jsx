import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import NotesPage from './pages/NotesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import WeatherPage from './pages/WeatherPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [todos, setTodos] = useState({});

  const navigate = (page, userId = null) => {
    setCurrentPage(page);
    if (userId) setSelectedUserId(userId);
  };

  // const handleLogout = () => {
  //     setIsAuthenticated(false);
  //     navigate('login'); 
  // };

  return (
    <AuthProvider>
      {currentPage === 'login' && <LoginPage onLogin={() => navigate('dashboard')} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} onLogout={handleLogout} />}
      {currentPage === 'users' && <UsersPage onNavigate={navigate} onSelectUser={(id) => navigate('userDetail', id)} />}
      {currentPage === 'userDetail' && <UserDetailPage userId={selectedUserId} onNavigate={navigate} todos={todos} setTodos={setTodos} />}
      {currentPage === 'notes' && <NotesPage onNavigate={navigate} />}
      {currentPage === 'analytics' && <AnalyticsPage onNavigate={navigate} />}
      {currentPage === 'weather' && <WeatherPage onNavigate={navigate} />}
    </AuthProvider>
  );
}

export default App;