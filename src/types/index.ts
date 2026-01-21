// src/types/index.ts

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string; // Nuevo campo obligatorio
    stock: number;    // Nuevo campo obligatorio
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'client'; // Rol estricto
}

// Definimos los estados posibles para evitar errores de texto
export type OrderStatus = 'Pendiente' | 'En Camino' | 'Entregado';

export interface Order {
    id: string;
    userId: string;
    customerName: string;
    items: CartItem[]; // La orden guarda items con cantidad (CartItem), no solo Products
    total: number;
    status: OrderStatus;
    address: string;
    date: string;
}