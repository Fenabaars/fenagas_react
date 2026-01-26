import { createContext, useState, type ReactNode } from 'react';
import type { User } from '../types'; 
import { initialUsers } from '../data/seed'; 

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
  // 1. Cargar usuario activo si existe en sesión
  const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem('fenagas_user');
      return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string, password: string): boolean => {
    // A) Obtener usuarios guardados (que pueden tener roles o datos editados)
    const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
    
    // B) Buscar PRIMERO en los guardados (prioridad alta para respetar cambios de rol)
    let foundUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
    );

    // C) Si no está en los guardados, buscar en los iniciales (Seed)
    if (!foundUser) {
        foundUser = initialUsers.find(
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

      // Verificar que el correo no exista ni en registrados ni en iniciales
      const emailExists = 
          registeredUsers.some(u => u.email === newUser.email) || 
          initialUsers.some(u => u.email === newUser.email);

      if (emailExists) return false;

      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('fenagas_registered_users', JSON.stringify(updatedUsers));
      return true;
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;

    // 1. Actualizar el estado del usuario actual (sesión activa)
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('fenagas_user', JSON.stringify(newUser));

    // 2. Actualizar también en la "base de datos" local (fenagas_registered_users)
    const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
    const userIndex = registeredUsers.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        // Si el usuario ya existe en la lista guardada, lo actualizamos
        registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updatedData };
    } else {
        // Si es un usuario "Seed" (por defecto) que se edita por primera vez, lo agregamos a la lista guardada
        registeredUsers.push(newUser);
    }
    
    // Guardar la lista actualizada para que el cambio (ej: Admin) persista al salir y volver a entrar
    localStorage.setItem('fenagas_registered_users', JSON.stringify(registeredUsers));
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
      updateProfile, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};