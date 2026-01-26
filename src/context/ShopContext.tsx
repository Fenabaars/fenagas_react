// src/context/ShopContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, CartItem, Order } from '../types';
import { initialProducts } from '../data/seed';

interface ShopContextType {
    products: Product[];
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    orders: Order[];
    placeOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    assignDriver: (orderId: string, driverName: string) => void; // <--- NUEVA FUNCIÓN
}

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    // 1. Cargar Productos
    const [products, setProducts] = useState<Product[]>(() => {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : initialProducts;
    });

    // 2. Cargar Carrito
    const [cart, setCart] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });
    
    // 3. Cargar Órdenes
    const [orders, setOrders] = useState<Order[]>(() => {
        const stored = localStorage.getItem('orders');
        return stored ? JSON.parse(stored) : [];
    });

    // --- Efectos de Persistencia ---
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // --- Funciones del Carrito ---
    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const clearCart = () => setCart([]);

    // --- Funciones de Órdenes ---
    const placeOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]); 
        clearCart();
    };

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => 
            o.id === orderId ? { ...o, status } : o
        ));
    };

    // NUEVA FUNCIÓN: Asignar Chofer
    const assignDriver = (orderId: string, driverName: string) => {
        setOrders(prev => prev.map(o => 
            o.id === orderId ? { ...o, driver: driverName } : o
        ));
    };

    return (
        <ShopContext.Provider value={{ 
            products, 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart,
            orders, 
            placeOrder, 
            updateOrderStatus, 
            assignDriver // Exportamos la nueva función
        }}>
            {children}
        </ShopContext.Provider>
    );
};