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
}

// Valores iniciales por defecto
export const ShopContext = createContext<ShopContextType>({
    products: [],
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    orders: [],
    placeOrder: () => {},
    updateOrderStatus: () => {},
});

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    // Cargar productos desde localStorage o usar los iniciales
    const [products, setProducts] = useState<Product[]>(() => {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : initialProducts;
    });

    const [cart, setCart] = useState<CartItem[]>([]);
    
    // Cargar órdenes
    const [orders, setOrders] = useState<Order[]>(() => {
        const stored = localStorage.getItem('orders');
        return stored ? JSON.parse(stored) : [];
    });

    // Guardar en localStorage cuando cambian productos u órdenes
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
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
        setCart(prev => prev.map(item => 
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const placeOrder = (order: Order) => {
        setOrders(prev => [...prev, order]);
        clearCart();
    };

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => 
            o.id === orderId ? { ...o, status } : o
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
            updateOrderStatus
        }}>
            {children}
        </ShopContext.Provider>
    );
};