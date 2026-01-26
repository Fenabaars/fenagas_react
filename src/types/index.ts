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

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'client'; 
    rut?: string;
    phone?: string;
}

export type OrderStatus = 'Pendiente' | 'En Camino' | 'Entregado' | 'Cancelado';

// ACTUALIZADO: Agregamos phone y commune
export interface Order {
    id: string;
    userId: string; // Si es invitado será "guest"
    customerName: string;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    address: string;
    commune: string; // Nuevo
    phone: string;   // Nuevo
    date: string;
    paymentMethod: string; // Nuevo (para saber si paga con efectivo o tarjeta)
    driver?: string;
}