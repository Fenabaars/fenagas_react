// src/services/authService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from './authService';
import type { User } from '../types';

describe('AuthService - Pruebas Unitarias', () => {
    
    beforeEach(() => {
        localStorage.clear();
    });

    it('Debe iniciar sesión correctamente con credenciales Admin', () => {
        const user = authService.login('admin@fenagas.cl', 'admin');
        expect(user).not.toBeNull();
        expect(user?.role).toBe('admin');
    });

    it('Debe fallar el login con contraseña incorrecta', () => {
        const user = authService.login('admin@fenagas.cl', 'error');
        expect(user).toBeNull();
    });

    it('Debe permitir registrar un nuevo usuario válido', () => {
        const newUser: User = {
            id: '999',
            name: 'Usuario Nuevo',
            email: 'nuevo@test.cl',
            password: '123',
            role: 'client',
            rut: '11.111.111-1',
            phone: '912345678'
        };
        const result = authService.register(newUser);
        expect(result).toBe(true);
    });

    it('No debe permitir registrar un Email duplicado', () => {
        const existingUser: User = {
            id: '888',
            name: 'Clon',
            email: 'admin@fenagas.cl', // Ya existe
            password: '000',
            role: 'client'
        };
        expect(authService.register(existingUser)).toBe(false);
    });

    // --- NUEVAS PRUEBAS ---

    it('No debe permitir registrar un RUT duplicado', () => {
        // 1. Registramos al primer usuario
        const user1: User = {
            id: '001', name: 'Juan', email: 'juan@test.cl', role: 'client', 
            rut: '12.345.678-9' // RUT Original
        };
        authService.register(user1);

        // 2. Intentamos registrar a otro con el MISMO RUT
        const user2: User = {
            id: '002', name: 'Pedro', email: 'pedro@test.cl', role: 'client',
            rut: '12.345.678-9' // RUT Duplicado
        };

        // Debe fallar (false)
        expect(authService.register(user2)).toBe(false);
    });

    it('No debe permitir registrar un Teléfono duplicado', () => {
        // 1. Registramos al primer usuario
        const user1: User = {
            id: '003', name: 'Ana', email: 'ana@test.cl', role: 'client',
            phone: '+56911111111' // Teléfono Original
        };
        authService.register(user1);

        // 2. Intentamos registrar a otro con el MISMO Teléfono
        const user2: User = {
            id: '004', name: 'Maria', email: 'maria@test.cl', role: 'client',
            phone: '+56911111111' // Teléfono Duplicado
        };

        // Debe fallar (false)
        expect(authService.register(user2)).toBe(false);
    });
});