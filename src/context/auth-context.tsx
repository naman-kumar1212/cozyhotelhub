
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'admin';
  reservations?: any[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('hotelUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('hotelUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if credentials exist in localStorage
      const savedCredentials = localStorage.getItem('userCredentials');
      let credentials = savedCredentials ? JSON.parse(savedCredentials) : {};
      
      // Demo login logic - replace with actual authentication
      if (email === 'demo@example.com' && password === 'password') {
        const user = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'guest' as const,
          reservations: []
        };
        setUser(user);
        localStorage.setItem('hotelUser', JSON.stringify(user));
        toast.success('Login successful!');
        return true;
      } else if (email === 'admin@example.com' && password === 'admin') {
        const user = {
          id: '2',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin' as const,
          reservations: []
        };
        setUser(user);
        localStorage.setItem('hotelUser', JSON.stringify(user));
        toast.success('Admin login successful!');
        return true;
      } else if (credentials[email] && credentials[email].password === password) {
        // User exists in our saved credentials
        const user = {
          id: credentials[email].id,
          name: credentials[email].name,
          email: email,
          role: 'guest' as const,
          reservations: []
        };
        setUser(user);
        localStorage.setItem('hotelUser', JSON.stringify(user));
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid email or password.');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotelUser');
    toast.success('You have been logged out.');
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the email already exists in our credentials store
      const savedCredentials = localStorage.getItem('userCredentials');
      let credentials = savedCredentials ? JSON.parse(savedCredentials) : {};
      
      if (credentials[email]) {
        toast.error('Email already exists. Please use a different email or try logging in.');
        return false;
      }
      
      // Generate a unique ID for the new user
      const userId = Math.random().toString(36).substr(2, 9);
      
      // Save the user credentials
      credentials[email] = {
        id: userId,
        name: name,
        password: password
      };
      
      localStorage.setItem('userCredentials', JSON.stringify(credentials));
      
      // Create the user object and log them in
      const user = {
        id: userId,
        name,
        email,
        role: 'guest' as const,
        reservations: []
      };
      
      setUser(user);
      localStorage.setItem('hotelUser', JSON.stringify(user));
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
