// src/pages/Checkout.tsx
import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext'; // Importar Auth
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import type { Order } from '../types';

const Checkout = () => {
  const { cart, placeOrder, clearCart } = useContext(ShopContext);
  const { user } = useContext(AuthContext); // Obtener usuario si existe
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    commune: '',
    phone: '',
    paymentMethod: 'credit'
  });

  // Si el usuario está logueado, pre-llenamos sus datos
  useEffect(() => {
    if (user) {
        setFormData(prev => ({
            ...prev,
            name: user.name,
            phone: user.phone || '',
            // Si tuvieras dirección guardada en el user, la pondrías aquí
        }));
    }
  }, [user]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Generar ID de orden único (Ej: FG-8842)
    const orderId = `FG-${Math.floor(1000 + Math.random() * 9000)}`;

    // Crear el objeto de la orden
    const newOrder: Order = {
        id: orderId,
        userId: user ? user.id : 'guest', // Si no hay user, es guest
        customerName: formData.name,
        items: cart,
        total: total,
        status: 'Pendiente',
        address: formData.address,
        commune: formData.commune,
        phone: formData.phone,
        date: new Date().toLocaleString(),
        paymentMethod: formData.paymentMethod
    };
    
    // Simulación de proceso (2 seg)
    setTimeout(() => {
      setLoading(false);
      
      // Guardar la orden en el Contexto (y localStorage)
      placeOrder(newOrder); 
      
      Swal.fire({
        title: '¡Pedido Recibido!',
        html: `Tu número de orden es: <strong>${orderId}</strong><br>Guárdalo para el seguimiento.`,
        icon: 'success',
        confirmButtonText: 'Ver Seguimiento',
        confirmButtonColor: '#28a745',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
            navigate(`/seguimiento?orden=${orderId}`);
        }
      });
      
    }, 2000);
  };

  if (cart.length === 0) {
     return <div className="container py-5 text-center">No hay productos para pagar.</div>;
  }

  return (
    <main className="container py-5">
      <h2 className="mb-4 fw-bold text-primary">Finalizar Compra</h2>
      
      <div className="row g-5">
        <div className="col-md-7 col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3">
              <h4 className="mb-0">📍 Datos de Despacho</h4>
            </div>
            <div className="card-body p-4">
              <form id="checkout-form" onSubmit={handlePayment}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Nombre Completo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        placeholder="Juan Pérez" 
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Dirección</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required 
                        placeholder="Av. Siempre Viva 742" 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Comuna</label>
                    <select 
                        className="form-select" 
                        name="commune"
                        value={formData.commune}
                        onChange={handleChange}
                        required
                    >
                      <option value="">Seleccionar...</option>
                      <option>Concepción</option>
                      <option>Talcahuano</option>
                      <option>Hualpén</option>
                      <option>San Pedro</option>
                      <option>Chiguayante</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                        placeholder="+56 9 1234 5678" 
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">💳 Método de Pago</h4>
                <div className="my-3">
                  <div className="form-check">
                    <input 
                        id="credit" 
                        name="paymentMethod" 
                        type="radio" 
                        className="form-check-input" 
                        value="credit"
                        checked={formData.paymentMethod === 'credit'}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="credit">Tarjeta de Crédito / Débito</label>
                  </div>
                  <div className="form-check">
                    <input 
                        id="transfer" 
                        name="paymentMethod" 
                        type="radio" 
                        className="form-check-input" 
                        value="transfer"
                        checked={formData.paymentMethod === 'transfer'}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="transfer">Transferencia Bancaria</label>
                  </div>
                  <div className="form-check">
                    <input 
                        id="cash" 
                        name="paymentMethod" 
                        type="radio" 
                        className="form-check-input" 
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="cash">Efectivo contra entrega</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Resumen (Igual que antes) */}
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
                    <small className="text-muted">x{item.quantity}</small>
                  </div>
                  <span className="text-muted">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between bg-light py-3">
                <span className="fw-bold text-success">Total</span>
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