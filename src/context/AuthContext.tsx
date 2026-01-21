// src/context/AuthContext.tsx
import { createContext, useState, type ReactNode } from 'react';
import type { User } from '../types'; 
import { initialUsers } from '../data/seed'; 

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (newUser: User) => boolean; // <--- Nueva función
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Estado del usuario actual (Sesión activa)
  const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem('fenagas_user');
      return storedUser ? JSON.parse(storedUser) : null;
  });

  // 2. Función Login (Mejorada)
  const login = (email: string, password: string): boolean => {
    // A) Buscar en usuarios predefinidos (seed)
    let foundUser = initialUsers.find(
      (u) => u.email === email && u.password === password
    );

    // B) Si no está en seed, buscar en localStorage (Usuarios registrados)
    if (!foundUser) {
        const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
        foundUser = registeredUsers.find(
            (u) => u.email === email && u.password === password
        );
    }

    // Si se encontró en alguno de los dos lados:
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('fenagas_user', JSON.stringify(foundUser)); // Guardar sesión
      return true;
    }
    
    return false;
  };

  // 3. Función Registro (Nueva)
  const register = (newUser: User): boolean => {
      // Obtener usuarios ya registrados
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');

      // Verificar que el correo no exista (ni en seed ni en locales)
      const emailExists = 
          registeredUsers.some(u => u.email === newUser.email) || 
          initialUsers.some(u => u.email === newUser.email);

      if (emailExists) {
          return false; // El correo ya está usado
      }

      // Guardar nuevo usuario
      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('fenagas_registered_users', JSON.stringify(updatedUsers));
      return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fenagas_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, // Exportamos la función
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};