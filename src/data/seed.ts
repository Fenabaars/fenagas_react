// src/data/seed.ts
import { Product, User } from '../types';

export const initialProducts: Product[] = [
  { id: 1, name: "Cilindro 11kg", price: 15500, description: "Perfecto para cocinas pequeñas", image: "/img/perrosgas.webp", category: "gas", stock: 120 },
  { id: 2, name: "Cilindro 15kg", price: 21200, description: "Formato estándar familia", image: "/img/perrosgas.webp", category: "gas", stock: 85 },
  { id: 3, name: "Cilindro 45kg", price: 65800, description: "Máxima duración", image: "/img/perrosgas.webp", category: "gas", stock: 12 },
  { id: 4, name: "Gas Catalítico", price: 22500, description: "Alta eficiencia", image: "/img/perrosgas.webp", category: "gas", stock: 50 },
];

export const initialUsers: User[] = [
  { id: "1", email: "admin@fenagas.cl", name: "Feña Gas", role: "admin", password: "admin" },
  { id: "2", email: "cliente@gmail.com", name: "Juan Pérez", role: "client", password: "123" },
];

export const initializeData = () => {
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([])); // Iniciar vacío
  }
};