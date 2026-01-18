// src/types/index.ts

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  password?: string; // Solo para validación, no guardar en texto plano en producción real
}

export interface Product {
  id: number;
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

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'Pendiente' | 'En Camino' | 'Entregado';
  address: string;
  date: string;
}