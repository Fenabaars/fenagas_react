// src/pages/Checkout.tsx
import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulación de proceso de pago
    setTimeout(() => {
      setLoading(false);
      clearCart();
      // Redirigir a una página de éxito o seguimiento
      // En este ejemplo, vamos directo a seguimiento con un ID ficticio
      navigate('/seguimiento?orden=FG-2024-001');
    }, 2000);
  };

  if (cart.length === 0) {
     return <div className="container py-5 text-center">No hay productos para pagar.</div>;
  }

  return (
    <main className="container py-5">
      <h2 className="mb-4 fw-bold text-primary">Finalizar Compra</h2>
      
      <div className="row g-5">
        {/* Columna Izquierda: Datos de Envío y Pago */}
        <div className="col-md-7 col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3">
              <h4 className="mb-0">📍 Dirección de Envío</h4>
            </div>
            <div className="card-body p-4">
              <form id="checkout-form" onSubmit={handlePayment}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" required placeholder="Juan Pérez" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" required placeholder="Av. Siempre Viva 742" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Comuna</label>
                    <select className="form-select" required>
                      <option value="">Seleccionar...</option>
                      <option>Santiago</option>
                      <option>Maipú</option>
                      <option>Puente Alto</option>
                      <option>La Florida</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" required placeholder="+56 9 1234 5678" />
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">💳 Método de Pago</h4>
                <div className="my-3">
                  <div className="form-check">
                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked required />
                    <label className="form-check-label" htmlFor="credit">Tarjeta de Crédito / Débito</label>
                  </div>
                  <div className="form-check">
                    <input id="transfer" name="paymentMethod" type="radio" className="form-check-input" required />
                    <label className="form-check-label" htmlFor="transfer">Transferencia Bancaria</label>
                  </div>
                  <div className="form-check">
                    <input id="cash" name="paymentMethod" type="radio" className="form-check-input" required />
                    <label className="form-check-label" htmlFor="cash">Efectivo contra entrega</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Resumen de la Orden */}
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light py-3">
              <h4 className="mb-0 text-muted">Resumen del Pedido</h4>
            </div>
            <ul className="list-group list-group-flush">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm py-3">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">Cantidad: {item.quantity}</small>
                  </div>
                  <span className="text-muted">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between bg-light py-3">
                <span className="fw-bold text-success">Total a Pagar (CLP)</span>
                <strong className="text-success">${total.toLocaleString('es-CL')}</strong>
              </li>
            </ul>
            <div className="card-body">
              <button 
                className="btn btn-primary w-100 btn-lg" 
                type="submit" 
                form="checkout-form"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;