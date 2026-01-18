// src/pages/Cart.tsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/carrito.css';


const Cart = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    // Aquí podrías validar si hay usuario logueado
    const newOrder = {
        id: `FG-${Math.floor(Math.random() * 10000)}`,
        userId: "2", // Simulado
        customerName: "Cliente Web",
        items: cart,
        total: total,
        status: 'Pendiente',
        address: "Dirección simulada",
        date: new Date().toLocaleDateString()
    };
    
    // @ts-ignore
    placeOrder(newOrder);
    alert('¡Pedido realizado con éxito!');
    navigate('/segimiento'); // O la página de éxito
  };

  if (cart.length === 0) return <div style={{padding: '50px', textAlign:'center'}}>Tu carrito está vacío</div>;

  return (
    <main className="carrito-container">
      <section className="items-carrito">
        <h2 style={{ color: 'var(--azul-seguridad)' }}>Tu Pedido</h2>
        
        {cart.map(item => (
            <div className="item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Precio: ${item.price.toLocaleString('es-CL')}</p>
                    <button className="btn-eliminar" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
                <div className="item-controles">
                    <input 
                        type="number" 
                        value={item.quantity} 
                        min="1" 
                        max="10" 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                </div>
            </div>
        ))}
      </section>

      <section className="resumen-pedido">
        <h3>Resumen</h3>
        <div className="resumen-linea total-grande">
            <span>Total:</span>
            <span>${total.toLocaleString('es-CL')}</span>
        </div>
        
        <button className="btn-pagar" onClick={handleCheckout}>Confirmar Pedido</button>
        <Link to="/productos" style={{display:'block', textAlign:'center', marginTop:'15px'}}>Seguir comprando</Link>
      </section>
    </main>
  );
};

export default Cart;