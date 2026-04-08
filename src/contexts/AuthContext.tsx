import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeJson } from '@/lib/api.ts';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'admin_token';

export { AuthContext };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      setToken(storedToken);
      verifyStoredToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyStoredToken = async (token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-token`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await safeJson(response);
        if (data.success) {
          setAdmin(data.admin);
        }
      } else {
        // Token is invalid, remove it
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
      }
    } catch (error) {
      console.error('Token verification error:', error);
      localStorage.removeItem(STORAGE_KEY);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await safeJson(response);

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }

    const newToken = data.token;
    setToken(newToken);
    setAdmin(data.admin);
    localStorage.setItem(STORAGE_KEY, newToken);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const verifyToken = async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-token`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await safeJson(response);
        return data.success;
      }

      return false;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    admin,
    token,
    loading,
    isAuthenticated: !!token && !!admin,
    login,
    logout,
    verifyToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
