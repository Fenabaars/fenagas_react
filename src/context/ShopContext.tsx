// src/context/ShopContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order } from '../types';
import { initializeData } from '../data/seed';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Cargar datos al inicio
  useEffect(() => {
    initializeData();
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    setProducts(storedProducts);
    setOrders(storedOrders);
    setCart(storedCart);
  }, []);

  // Guardar carrito al cambiar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if(quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const placeOrder = (newOrder: Order) => {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Actualizar Stock (Lógica simple)
    const updatedProducts = products.map(p => {
      const itemInCart = newOrder.items.find(i => i.id === p.id);
      if(itemInCart) return {...p, stock: p.stock - itemInCart.quantity};
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    clearCart();
  };
  
  const clearCart = () => setCart([]);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
      const updatedOrders = orders.map(o => o.id === orderId ? {...o, status} : o);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <ShopContext.Provider value={{ products, cart, orders, addToCart, removeFromCart, updateQuantity, clearCart, placeOrder, updateOrderStatus }}>
      {children}
    </ShopContext.Provider>
  );
};