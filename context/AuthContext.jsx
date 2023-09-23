'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  const restoreUserFromCookies = () => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      const parsedUser = JSON.parse(userFromCookie);
      setUser(parsedUser);
    }
  };

  useEffect(() => {
    restoreUserFromCookies(); 
  }, []);

  const login = (userData) => {
    setUser(userData);

    try {
      const jsonData = JSON.stringify(userData);
      Cookies.set('user', jsonData, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    } catch (error) {
      console.error("Error storing user data in cookies:", error);
    }
  };

  const logout = () => {
    setUser(null);

    try {
      Cookies.remove('user');
    } catch (error) {
      console.error("Error removing user data from cookies:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
