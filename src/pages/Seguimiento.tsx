// src/pages/Seguimiento.tsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Seguimiento = () => {
  const [searchParams] = useSearchParams();
  // Si viene un numero de orden en la URL (?orden=...), lo usamos
  const initialOrder = searchParams.get('orden') || '';
  
  const [orderId, setOrderId] = useState(initialOrder);
  const [status, setStatus] = useState<'idle' | 'found' | 'error'>('idle');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId === 'FG-2024-001') {
      setStatus('found');
    } else {
      setStatus('error');
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
                placeholder="Ej: FG-2024-001"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-lg px-4">
                Buscar
              </button>
            </form>
          </div>

          {status === 'error' && (
            <div className="alert alert-danger" role="alert">
              ❌ No encontramos un pedido con ese número. Intenta nuevamente.
            </div>
          )}

          {status === 'found' && (
            <div className="card shadow border-0 text-start animate__animated animate__fadeIn">
              <div className="card-header bg-success text-white">
                Pedido #{orderId} - <span className="fw-bold">En Camino</span>
              </div>
              <div className="card-body p-4">
                <h5 className="card-title">Estado del envío:</h5>
                
                {/* Barra de Progreso Bootstrap */}
                <div className="progress my-4" style={{ height: '25px' }}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
                    role="progressbar" 
                    style={{ width: '75%' }} 
                    aria-valuenow={75} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                  >
                    75% - Camión en ruta
                  </div>
                </div>

                <div className="d-flex justify-content-between text-muted small">
                  <span>Preparación</span>
                  <span>Salida</span>
                  <span className="fw-bold text-dark">En Ruta</span>
                  <span>Entregado</span>
                </div>

                <hr />
                <p className="mb-0">
                  <strong>Conductor:</strong> Juan Soto<br/>
                  <strong>ETA:</strong> 15-30 minutos
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Seguimiento;