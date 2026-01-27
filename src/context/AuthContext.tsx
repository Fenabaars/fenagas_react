// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types'; 
import { authService } from '../services/authService'; // <--- Importamos el servicio

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (newUser: User) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Inicializar estado pidiendo el usuario al servicio
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  // 2. Función Login delegada al servicio
  const login = (email: string, password: string): boolean => {
    const foundUser = authService.login(email, password);
    if (foundUser) {
        setUser(foundUser);
        return true;
    }
    return false;
  };

  // 3. Función Registro delegada al servicio
  const register = (newUser: User): boolean => {
      return authService.register(newUser);
  };

  // 4. Actualizar Perfil delegado al servicio
  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updatedUser = authService.updateProfile(user, updatedData);
    setUser(updatedUser); // Actualizamos el estado de React con el nuevo usuario devuelto
  };

  // 5. Logout delegado
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};