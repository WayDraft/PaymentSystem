// store-frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const response = await apiClient.post('/token/', { username, password });
      const { access, refresh } = response.data;
      Cookies.set('access_token', access, { expires: 1 / 24 });
      Cookies.set('refresh_token', refresh, { expires: 7 });
      const userProfile = await apiClient.get('/profile/');
      setUser(userProfile.data);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
  };

  const register = async (username, email, password) => {
    await apiClient.post('/register/', { username, email, password });
    return login(username, password);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        try {
          const userProfile = await apiClient.get('/profile/');
          setUser(userProfile.data);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const value = { user, loading, login, logout, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
