// src/types/index.ts

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    stock: number;
}

export interface CartItem extends Product {
    quantity: number;
}

// ACTUALIZADO: Agregamos rut y phone como opcionales (?)
export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'client'; 
    rut?: string;    // Nuevo
    phone?: string;  // Nuevo
}

export type OrderStatus = 'Pendiente' | 'En Camino' | 'Entregado';

export interface Order {
    id: string;
    userId: string;
    customerName: string;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    address: string;
    date: string;
}