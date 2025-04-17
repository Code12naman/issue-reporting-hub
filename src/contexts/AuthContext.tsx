
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, login as mockLogin, logout as mockLogout, currentUser } from '../utils/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthority: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(currentUser);

  const loginHandler = async (email: string, password: string) => {
    // In a real app, this would make an API call
    const loggedInUser = mockLogin(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  };

  const logoutHandler = () => {
    mockLogout();
    setUser(null);
  };

  const isAuthority = () => {
    return user?.role === 'authority';
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login: loginHandler, 
        logout: logoutHandler,
        isAuthority
      }}
    >
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
