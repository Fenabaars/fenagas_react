// src/data/seed.ts
import type { Product, User, Order } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Cilindro 11kg',
    price: 15500,
    description: 'Cilindro de gas licuado de 11kg, ideal para estufas y cocinas.',
    image: "/img/gas11.jpg", // <--- CAMBIO REALIZADO
    category: 'Gas',
    stock: 100
  },
  {
    id: '2',
    name: 'Cilindro 15kg',
    price: 21200,
    description: 'Cilindro de gas licuado de 15kg, mayor duración para tu hogar.',
    image: '/img/gas15.jpg', // <--- CAMBIO REALIZADO
    category: 'Gas',
    stock: 80
  },
  {
    id: '3',
    name: 'Cilindro 45kg',
    price: 65800,
    description: 'Cilindro de 45kg para alto consumo y calefacción central.',
    image: '/img/gas45.jpg', // <--- CAMBIO REALIZADO
    category: 'Gas',
    stock: 20
  },
  {
    id: '4',
    name: 'Gas Catalítico',
    price: 22500,
    description: 'Carga especial para estufas catalíticas.',
    image: '/img/perrosgas.webp', // Este lo mantenemos igual
    category: 'Gas',
    stock: 50
  }
];

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@fenagas.cl',
    password: 'admin',
    role: 'admin' as const
  },
  {
    id: '2',
    name: 'Juan Pérez',
    email: 'cliente@gmail.com',
    password: '123',
    role: 'client' as const
  }
];

export const initializeData = () => {
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem('orders')) {
    const emptyOrders: Order[] = [];
    localStorage.setItem('orders', JSON.stringify(emptyOrders));
  }
};