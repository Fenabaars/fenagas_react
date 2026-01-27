// src/services/authService.ts
import type { User } from '../types';
import { initialUsers } from '../data/seed';

const STORAGE_KEYS = {
    USER: 'fenagas_user',
    REGISTERED_USERS: 'fenagas_registered_users'
};

class AuthService {
    
    // 1. Obtener todos los usuarios
    private getAllUsers(): User[] {
        const storedUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
        
        const mergedUsers = [...initialUsers.map(seedUser => {
            const editedUser = storedUsers.find(u => u.id === seedUser.id || u.email === seedUser.email);
            return editedUser || seedUser;
        })];

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

    // 3. Lógica de Registro (¡ACTUALIZADA!)
    register(newUser: User): boolean {
        const users = this.getAllUsers();
        
        // A) Verificar si el EMAIL ya existe
        if (users.some(u => u.email === newUser.email)) {
            console.warn('Error de registro: El email ya existe.');
            return false; 
        }

        // B) Verificar si el RUT ya existe (si el usuario ingresó uno)
        if (newUser.rut && users.some(u => u.rut === newUser.rut)) {
            console.warn('Error de registro: El RUT ya está registrado.');
            return false;
        }

        // C) Verificar si el TELÉFONO ya existe (si el usuario ingresó uno)
        if (newUser.phone && users.some(u => u.phone === newUser.phone)) {
            console.warn('Error de registro: El teléfono ya está registrado.');
            return false;
        }

        // Si pasa todas las validaciones, guardamos
        const registeredUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
        registeredUsers.push(newUser);
        localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
        
        return true;
    }

    // 4. Lógica de Actualizar Perfil
    updateProfile(currentUser: User, updatedData: Partial<User>): User {
        const newUser = { ...currentUser, ...updatedData };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

        const registeredUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
        const userIndex = registeredUsers.findIndex(u => u.id === currentUser.id);

        if (userIndex !== -1) {
            registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updatedData };
        } else {
            registeredUsers.push(newUser);
        }
        
        localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
        return newUser;
    }

    // 5. Cerrar Sesión
    logout(): void {
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    // 6. Obtener usuario actual
    getCurrentUser(): User | null {
        const stored = localStorage.getItem(STORAGE_KEYS.USER);
        return stored ? JSON.parse(stored) : null;
    }
}

export const authService = new AuthService();