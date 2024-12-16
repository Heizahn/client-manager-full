import React, { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { login } from '../services/auth';

const AuthContext = createContext({
  isLogged: true,
  user: {},
  setIsLogged: () => {},
  logout: () => {},
  login: () => {},
});

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(true);
  const [user, login] = useState({});

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLogged(false);
    login({});
    toast.warning('Sesión cerrada');
  }

  useEffect(() => {
    // const toke = JSON.parse(localStorage.getItem('user') || null);
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user') || null);
      login(user);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, logout, user, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
