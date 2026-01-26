// src/pages/Seguimiento.tsx
import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // 1. Importar Contexto
import type { Order } from '../types';

const Seguimiento = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useContext(ShopContext); // 2. Obtener lista de órdenes reales

  const initialOrderId = searchParams.get('orden') || '';
  
  const [inputId, setInputId] = useState(initialOrderId);
  const [status, setStatus] = useState<'idle' | 'found' | 'error'>('idle');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);

  // Efecto para buscar automáticamente si viene el ID en la URL
  useEffect(() => {
    if (initialOrderId) {
        buscarPedido(initialOrderId);
    }
  }, [initialOrderId, orders]);

  const buscarPedido = (idToSearch: string) => {
    const order = orders.find(o => o.id === idToSearch);
    
    if (order) {
        setFoundOrder(order);
        setStatus('found');
    } else {
        setStatus('error');
        setFoundOrder(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    buscarPedido(inputId);
  };

  // Función auxiliar para calcular el porcentaje de la barra según el estado
  const getProgress = (status: string) => {
      switch(status) {
          case 'Pendiente': return 25;
          case 'En Camino': return 75;
          case 'Entregado': return 100;
          default: return 0;
      }
  };

  const getProgressLabel = (status: string) => {
      switch(status) {
          case 'Pendiente': return 'Recibido - Preparando';
          case 'En Camino': return 'En Ruta - Chofer asignado';
          case 'Entregado': return 'Entregado con éxito';
          default: return 'Estado desconocido';
      }
  };

  return (
    <main className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="mb-3 fw-bold">Rastrea tu Pedido 🚚</h1>
          <p className="text-muted mb-5">Ingresa tu número de seguimiento para ver el estado de tu gas.</p>

          <div className="card shadow-sm p-4 mb-5 border-0">
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <input 
                type="text" 
                className="form-control form-control-lg" 
                placeholder="Ej: FG-1234"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-lg px-4">
                Buscar
              </button>
            </form>
          </div>

          {status === 'error' && (
            <div className="alert alert-danger" role="alert">
              ❌ No encontramos un pedido con el número <strong>{inputId}</strong>. Verifica e intenta nuevamente.
            </div>
          )}

          {status === 'found' && foundOrder && (
            <div className="card shadow border-0 text-start animate__animated animate__fadeIn">
              <div className={`card-header text-white ${foundOrder.status === 'Entregado' ? 'bg-success' : foundOrder.status === 'En Camino' ? 'bg-info' : 'bg-warning'}`}>
                Pedido #{foundOrder.id} - <span className="fw-bold">{foundOrder.status}</span>
              </div>
              <div className="card-body p-4">
                <h5 className="card-title">Detalles del Envío:</h5>
                
                {/* Barra de Progreso Dinámica */}
                <div className="progress my-4" style={{ height: '25px' }}>
                  <div 
                    className={`progress-bar progress-bar-striped progress-bar-animated ${foundOrder.status === 'Entregado' ? 'bg-success' : 'bg-warning'}`}
                    role="progressbar" 
                    style={{ width: `${getProgress(foundOrder.status)}%` }} 
                    aria-valuenow={getProgress(foundOrder.status)} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                  >
                    {getProgressLabel(foundOrder.status)}
                  </div>
                </div>

                <div className="d-flex justify-content-between text-muted small">
                  <span className={foundOrder.status === 'Pendiente' ? 'fw-bold text-dark' : ''}>Preparación</span>
                  <span className={foundOrder.status === 'En Camino' ? 'fw-bold text-dark' : ''}>En Ruta</span>
                  <span className={foundOrder.status === 'Entregado' ? 'fw-bold text-dark' : ''}>Entregado</span>
                </div>

                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <p className="mb-1"><strong>Cliente:</strong> {foundOrder.customerName}</p>
                        <p className="mb-1"><strong>Destino:</strong> {foundOrder.address}, {foundOrder.commune}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="mb-1">
                            <strong>Chofer:</strong> {foundOrder.driver ? (
                                <span className="badge bg-primary ms-2">{foundOrder.driver}</span>
                            ) : (
                                <span className="text-muted ms-2 fst-italic">Por asignar...</span>
                            )}
                        </p>
                        <p className="mb-0"><strong>Total:</strong> ${foundOrder.total.toLocaleString('es-CL')}</p>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Seguimiento;