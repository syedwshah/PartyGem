// src/contexts/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterInfo } from '../types/User';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for accessing the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage or an API on mount
  useEffect(() => {
    // Example: Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    // Future: Fetch user from backend if using tokens
  }, []);

  // Mock login function (replace with API call)
  const login = async (credentials: LoginCredentials) => {
    // TODO: Replace with actual API call
    // Example:
    // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) });
    // const data = await response.json();
    // if (response.ok) { ... }

    // Mock response
    const mockUser: User = {
      id: 1,
      username: credentials.username,
      email: `${credentials.username}@example.com`,
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    // TODO: Call logout API endpoint if needed
  };

  // Mock register function (replace with API call)
  const register = async (userInfo: RegisterInfo) => {
    // TODO: Replace with actual API call
    // Example:
    // const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify(userInfo) });
    // const data = await response.json();
    // if (response.ok) { ... }

    // Simulate API delay and auto-login after registration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: 2,
      username: userInfo.username,
      email: userInfo.email,
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
