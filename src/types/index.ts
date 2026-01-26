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

// IMPORTANTE: Aquí agregamos 'driver', 'commune', 'phone' y 'paymentMethod'
export interface Order {
    id: string;
    userId: string;
    customerName: string;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    address: string;
    commune: string;      // <--- Asegúrate de tener esto
    phone: string;        // <--- Asegúrate de tener esto
    date: string;
    paymentMethod: string; // <--- Asegúrate de tener esto
    driver?: string;       // <--- ESTE ES EL QUE FALTA SEGURO
}