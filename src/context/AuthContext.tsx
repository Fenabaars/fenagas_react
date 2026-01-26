// src/context/AuthContext.tsx
import { createContext, useState, type ReactNode } from 'react';
import type { User } from '../types'; 
import { initialUsers } from '../data/seed'; 

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (newUser: User) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void; // <--- NUEVA FUNCIÓN
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem('fenagas_user');
      return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string, password: string): boolean => {
    let foundUser = initialUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
        const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
        foundUser = registeredUsers.find(
            (u) => u.email === email && u.password === password
        );
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('fenagas_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const register = (newUser: User): boolean => {
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');

      const emailExists = 
          registeredUsers.some(u => u.email === newUser.email) || 
          initialUsers.some(u => u.email === newUser.email);

      if (emailExists) return false;

      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('fenagas_registered_users', JSON.stringify(updatedUsers));
      return true;
  };

  // --- NUEVA LÓGICA PARA ACTUALIZAR PERFIL ---
  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;

    // 1. Actualizar el estado actual
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('fenagas_user', JSON.stringify(newUser));

    // 2. Actualizar también en la lista de "Usuarios Registrados" (para que persista al reloguear)
    const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
    const userIndex = registeredUsers.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        registeredUsers[userIndex] = newUser;
        localStorage.setItem('fenagas_registered_users', JSON.stringify(registeredUsers));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fenagas_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout,
      updateProfile, // Exportamos la función
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};