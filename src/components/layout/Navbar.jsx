import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ title, showLogout = false, onBack = null, backText = "Back" }) => {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div>
        {onBack ? (
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800">
            {backText}
          </button>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        )}
      </div>

      {showLogout && (
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
