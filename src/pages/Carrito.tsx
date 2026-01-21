// src/pages/Carrito.tsx
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleProcessCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout'); 
  };

  if (cart.length === 0) {
    return (
        <div className="container py-5 text-center">
            <div className="py-5">
                <h2 className="display-6 mb-4">Tu carrito está vacío 🛒</h2>
                <Link to="/productos" className="btn btn-primary btn-lg">
                    Ir a comprar
                </Link>
            </div>
        </div>
    );
  }

  return (
    <main className="container py-5">
      <h2 className="mb-4 fw-bold text-primary">Tu Pedido</h2>
      
      <div className="row g-5">
        {/* Columna Izquierda: Lista de items */}
        <div className="col-lg-8">
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    {cart.map((item, index) => (
                        <div key={item.id} className={`d-flex align-items-center p-3 ${index !== cart.length -1 ? 'border-bottom' : ''}`}>
                            {/* Imagen */}
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="rounded"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                            />
                            
                            {/* Info */}
                            <div className="ms-3 flex-grow-1">
                                <h5 className="mb-1">{item.name}</h5>
                                <p className="mb-0 text-muted">
                                    Precio: <span className="fw-bold text-dark">${item.price.toLocaleString('es-CL')}</span>
                                </p>
                            </div>

                            {/* Controles Cantidad */}
                            <div className="me-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={item.quantity} 
                                    min="1" 
                                    max="10" 
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    style={{ width: '70px' }}
                                />
                            </div>

                            {/* Eliminar */}
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="btn btn-outline-danger btn-sm"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Columna Derecha: Resumen */}
        <div className="col-lg-4">
            <div className="card shadow-sm border-0 bg-light">
                <div className="card-body p-4">
                    <h4 className="card-title mb-4">Resumen</h4>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>${total.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-4 border-top pt-3">
                        <span className="h4 fw-bold">Total</span>
                        <span className="h4 fw-bold text-success">${total.toLocaleString('es-CL')}</span>
                    </div>
                    
                    <button 
                        className="btn btn-success w-100 btn-lg mb-3" 
                        onClick={handleProcessCheckout}
                    >
                        Ir a Pagar
                    </button>
                    
                    <Link to="/productos" className="d-block text-center text-decoration-none text-muted">
                        Seguir comprando
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;