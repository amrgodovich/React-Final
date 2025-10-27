import React from 'react';
import { Users, FileText, BarChart3, Cloud } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const Dashboard = ({ onNavigate }) => {
  const cards = [
    { id: 'users', title: 'User & Posts Manager', icon: Users, color: 'bg-blue-500' },
    { id: 'notes', title: 'Note Manager', icon: FileText, color: 'bg-green-500' },
    { id: 'analytics', title: 'Analytics', icon: BarChart3, color: 'bg-purple-500' },
    { id: 'weather', title: 'Weather Widget', icon: Cloud, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar title="Dashboard" showLogout={true} />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                <p className="text-gray-600 mt-2">Click to explore</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;