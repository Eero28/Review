import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userInfo: { token: string | null; role: string | null } | null;
  login: (token: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<{ token: string | null; role: string | null } | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole'); // Retrieve role from AsyncStorage
      if (token && role) {
        setUserInfo({ token, role });
      }
    };
    loadUserInfo();
  }, []);

  const login = async (token: string, role: string) => {
    setUserInfo({ token, role });
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userRole', role); 
  };

  const logout = async () => {
    setUserInfo(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userRole'); 
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
