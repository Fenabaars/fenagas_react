import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, placeOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
        id: `FG-${Math.floor(Math.random() * 10000)}`,
        userId: "2",
        customerName: "Cliente Web",
        items: cart,
        total: total,
        status: 'Pendiente' as const,
        address: "Av. Principal 123", // Dato simulado del form
        date: new Date().toLocaleDateString()
    };
    
    placeOrder(newOrder);
    alert('¡Pedido enviado! Tu gas va en camino.');
    navigate('/seguimiento');
  };

  return (
    <div style={{ padding: '40px 10%', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--azul-seguridad)', textAlign: 'center' }}>Finalizar Compra</h2>
        
        <form onSubmit={handleConfirm} style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px' }}>📍 Dirección de Despacho</h3>
            <input type="text" placeholder="Calle y Número" required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} />
            
            <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>💳 Método de Pago</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <label style={{ flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="pago" defaultChecked /> Efectivo al recibir
                </label>
                <label style={{ flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="pago" /> Tarjeta (WebPay)
                </label>
            </div>

            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'right' }}>
                Total a Pagar: <span style={{ color: 'var(--naranja-llama)' }}>${total.toLocaleString('es-CL')}</span>
            </div>

            <button type="submit" style={{ width: '100%', padding: '15px', background: 'var(--exito)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>
                Confirmar Pedido 🚚
            </button>
        </form>
    </div>
  );
};

export default Checkout;