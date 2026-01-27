// src/services/authService.ts
import type { User } from '../types';
import { initialUsers } from '../data/seed';

// Definimos las claves de almacenamiento como constantes para evitar errores de dedo
const STORAGE_KEYS = {
    USER: 'fenagas_user',
    REGISTERED_USERS: 'fenagas_registered_users'
};

class AuthService {
    
    // 1. Obtener todos los usuarios (Seed + Registrados)
    private getAllUsers(): User[] {
        const storedUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
        
        // Combinamos listas (dando prioridad a los editados en localStorage si el ID coincide)
        const mergedUsers = [...initialUsers.map(seedUser => {
            const editedUser = storedUsers.find(u => u.id === seedUser.id || u.email === seedUser.email);
            return editedUser || seedUser;
        })];

        // Agregamos los nuevos que no estaban en el seed
        storedUsers.forEach(storedUser => {
            if (!mergedUsers.some(u => u.id === storedUser.id)) {
                mergedUsers.push(storedUser);
            }
        });

        return mergedUsers;
    }

    // 2. Lógica de Login
    login(email: string, password: string): User | null {
        const users = this.getAllUsers();
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(foundUser));
            return foundUser;
        }
        return null;
    }

    // 3. Lógica de Registro
    register(newUser: User): boolean {
        const users = this.getAllUsers();
        
        // Verificar si el email ya existe
        if (users.some(u => u.email === newUser.email)) {
            return false; // El usuario ya existe
        }

        // Guardar en la lista de registrados
        const registeredUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
        registeredUsers.push(newUser);
        localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
        
        return true;
    }

    // 4. Lógica de Actualizar Perfil
    updateProfile(currentUser: User, updatedData: Partial<User>): User {
        const newUser = { ...currentUser, ...updatedData };
        
        // Actualizar sesión actual
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

        // Actualizar base de datos de usuarios
        const registeredUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
        const userIndex = registeredUsers.findIndex(u => u.id === currentUser.id);

        if (userIndex !== -1) {
            registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updatedData };
        } else {
            // Si era un usuario seed original, ahora pasa a ser un usuario registrado/editado
            registeredUsers.push(newUser);
        }
        
        localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
        return newUser;
    }

    // 5. Cerrar Sesión
    logout(): void {
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    // 6. Obtener usuario actual (al recargar la página)
    getCurrentUser(): User | null {
        const stored = localStorage.getItem(STORAGE_KEYS.USER);
        return stored ? JSON.parse(stored) : null;
    }
}

// Exportamos una instancia única (Singleton)
export const authService = new AuthService();