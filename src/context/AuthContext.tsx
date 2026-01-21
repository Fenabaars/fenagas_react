// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types'; 
import { initialUsers } from '../data/seed'; 

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Efecto para recuperar la sesión si el usuario recarga la página
  useEffect(() => {
    const storedUser = localStorage.getItem('fenagas_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al recuperar sesión", error);
        localStorage.removeItem('fenagas_user');
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Buscamos el usuario en la lista de usuarios iniciales
    const foundUser = initialUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('fenagas_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fenagas_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};