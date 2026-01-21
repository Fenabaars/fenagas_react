// src/pages/Carrito.tsx
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
// import '../styles/carrito.css'; 

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleProcessCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout'); // <--- AHORA REDIRIGE A LA PÁGINA DE PAGO
  };

  if (cart.length === 0) {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Tu carrito está vacío</h2>
            <Link to="/productos" className="btn-principal" style={{ marginTop: '20px', display: 'inline-block', color: 'blue' }}>
                Ir a comprar
            </Link>
        </div>
    );
  }

  return (
    <main className="carrito-container" style={{ padding: '20px' }}>
      <section className="items-carrito">
        <h2 style={{ color: '#1e3a8a' }}>Tu Pedido</h2>
        
        {cart.map(item => (
            <div className="item" key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100px', objectFit: 'cover' }} />
                <div className="item-info" style={{ flex: 1 }}>
                    <h4>{item.name}</h4>
                    <p>Precio: ${item.price.toLocaleString('es-CL')}</p>
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                    >
                        Eliminar
                    </button>
                </div>
                <div className="item-controles">
                    <input 
                        type="number" 
                        value={item.quantity} 
                        min="1" 
                        max="10" 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        style={{ padding: '5px', width: '60px' }}
                    />
                </div>
            </div>
        ))}
      </section>

      <section className="resumen-pedido" style={{ marginTop: '40px', borderTop: '2px solid #ddd', paddingTop: '20px', textAlign: 'right' }}>
        <h3>Resumen</h3>
        <div className="resumen-linea total-grande" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
            <span>Total: </span>
            <span>${total.toLocaleString('es-CL')}</span>
        </div>
        
        <button 
            className="btn-pagar" 
            onClick={handleProcessCheckout}
            style={{ padding: '15px 30px', background: '#27ae60', color: 'white', fontSize: '1.1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
            Ir a Pagar
        </button>
        <div style={{ marginTop: '15px' }}>
            <Link to="/productos" style={{ color: '#666' }}>Seguir comprando</Link>
        </div>
      </section>
    </main>
  );
};

export default Cart;