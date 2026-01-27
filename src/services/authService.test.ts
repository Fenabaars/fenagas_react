// src/services/authService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from './authService';
import type { User } from '../types';

describe('AuthService - Pruebas Unitarias', () => {
    
    // Limpiamos el localStorage antes de cada prueba para que sean independientes
    beforeEach(() => {
        localStorage.clear();
    });

    it('Debe iniciar sesión correctamente con credenciales Admin por defecto', () => {
        // El usuario admin viene del archivo seed.ts
        const user = authService.login('admin@fenagas.cl', 'admin');
        
        expect(user).not.toBeNull();
        expect(user?.name).toBe('Administrador');
        expect(user?.role).toBe('admin');
    });

    it('Debe fallar el login con contraseña incorrecta', () => {
        const user = authService.login('admin@fenagas.cl', 'contraseña_falsa');
        
        expect(user).toBeNull();
    });

    it('Debe permitir registrar un nuevo usuario', () => {
        const newUser: User = {
            id: '999',
            name: 'Usuario Test',
            email: 'test@nuevo.cl',
            password: '123',
            role: 'client'
        };

        const result = authService.register(newUser);
        expect(result).toBe(true);

        // Intentamos loguearnos con el nuevo usuario
        const loggedUser = authService.login('test@nuevo.cl', '123');
        expect(loggedUser).not.toBeNull();
        expect(loggedUser?.name).toBe('Usuario Test');
    });

    it('No debe permitir registrar un usuario duplicado', () => {
        const existingUser: User = {
            id: '888',
            name: 'Admin Clon',
            email: 'admin@fenagas.cl', // Este correo ya existe en el seed
            password: '000',
            role: 'client'
        };

        const result = authService.register(existingUser);
        expect(result).toBe(false);
    });
});