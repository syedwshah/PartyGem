// src/components/Header.tsx
import React from 'react';
import { useAuth } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-purple-500 text-white">
      <h1 className="text-xl">PartyGem</h1>
      {isAuthenticated && (
        <div className="flex items-center">
          <span className="mr-4">Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-800"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
