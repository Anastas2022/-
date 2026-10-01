import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loginWithSteam: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
  localStorage.setItem('token', token);
  fetch('http://localhost:4000/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => {
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    })
    .then(setUser)
    .catch(() => setUser(null));
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const loginWithSteam = () => {
    window.location.href = 'http://localhost:4000/api/auth/steam';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) login(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithSteam }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext not available');
  return ctx;
};
