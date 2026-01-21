// src/data/seed.ts
import { Product, User, Order } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Cilindro 11kg',
    price: 15500,
    description: 'Cilindro de gas licuado de 11kg, ideal para estufas y cocinas.',
    image: '/img/perrosgas.webp', // Asegúrate que esta ruta coincida con tu carpeta public
    category: 'Gas',
    stock: 100
  },
  {
    id: '2',
    name: 'Cilindro 15kg',
    price: 21200,
    description: 'Cilindro de gas licuado de 15kg, mayor duración para tu hogar.',
    image: '/img/perrosgas.webp',
    category: 'Gas',
    stock: 80
  },
  {
    id: '3',
    name: 'Cilindro 45kg',
    price: 65800,
    description: 'Cilindro de 45kg para alto consumo y calefacción central.',
    image: '/img/perrosgas.webp',
    category: 'Gas',
    stock: 20
  },
  {
    id: '4',
    name: 'Gas Catalítico',
    price: 22500,
    description: 'Carga especial para estufas catalíticas.',
    image: '/img/perrosgas.webp',
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
    role: 'admin' as const // 'as const' es CRÍTICO aquí para evitar errores de tipo
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
  // Solo inicializa si no existen datos previos para no borrar avances
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }
  
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  // Inicializar órdenes vacías si no existen
  if (!localStorage.getItem('orders')) {
    const emptyOrders: Order[] = [];
    localStorage.setItem('orders', JSON.stringify(emptyOrders));
  }
};