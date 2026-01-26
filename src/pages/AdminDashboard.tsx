// src/pages/AdminDashboard.tsx
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const AdminDashboard = () => {
  const { orders } = useContext(ShopContext);

  // --- CÁLCULOS DE ESTADÍSTICAS REALES ---
  const totalVentas = orders.reduce((acc, order) => acc + order.total, 0);
  const pedidosPendientes = orders.filter(o => o.status === 'Pendiente').length;
  const pedidosEnCamino = orders.filter(o => o.status === 'En Camino').length;
  const pedidosEntregados = orders.filter(o => o.status === 'Entregado').length;


  // Calculamos el valor máximo para que las barras tengan proporciones correctas
  const maxVal = Math.max(pedidosPendientes, pedidosEnCamino, pedidosEntregados,  5);

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 text-primary fw-bold">Panel de Control</h2>
      
      {/* --- TARJETAS DE ESTADÍSTICAS --- */}
      <div className="row g-4 mb-5">
        {/* Pedidos Pendientes */}
        <div className="col-md-3">
            <div className="card border-0 shadow-sm border-start border-4 border-warning h-100">
                <div className="card-body">
                    <h6 className="text-muted text-uppercase mb-2">Pendientes</h6>
                    <h3 className="fw-bold text-warning">{pedidosPendientes}</h3>
                </div>
            </div>
        </div>

        {/* Stock Crítico (Ejemplo estático o conectado a productos) */}



        {/* Ventas del Mes */}
        <div className="col-md-3">
            <div className="card border-0 shadow-sm border-start border-4 border-success h-100">
                <div className="card-body">
                    <h6 className="text-muted text-uppercase mb-2">Ventas Totales</h6>
                    <h3 className="fw-bold text-success">${totalVentas.toLocaleString('es-CL')}</h3>
                </div>
            </div>
        </div>

        {/* Repartidores (Estático por ahora) */}
        <div className="col-md-3">
            <div className="card border-0 shadow-sm border-start border-4 border-info h-100">
                <div className="card-body">
                    <h6 className="text-muted text-uppercase mb-2">En Reparto</h6>
                    <h3 className="fw-bold text-info">{pedidosEnCamino}</h3>
                </div>
            </div>
        </div>
      </div>

      {/* --- NUEVO GRÁFICO DE ESTADO DE PEDIDOS --- */}
      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold text-secondary">📊 Resumen Visual de Actividad</h5>
          </div>
          <div className="card-body p-4">
              {/* Contenedor del Gráfico */}
              <div className="d-flex align-items-end justify-content-around" style={{ height: '250px' }}>
                  
                  {/* Barra Pendientes */}
                  <div className="d-flex flex-column align-items-center w-100">
                      <div 
                        className="bg-warning rounded-top shadow-sm w-50" 
                        style={{ 
                            height: `${(pedidosPendientes / maxVal) * 100}%`, 
                            minHeight: '10px', 
                            transition: 'height 1s' 
                        }}
                      ></div>
                      <div className="mt-2 text-center">
                          <strong className="d-block">{pedidosPendientes}</strong>
                          <small className="text-muted">Pendientes</small>
                      </div>
                  </div>

                  {/* Barra En Camino */}
                  <div className="d-flex flex-column align-items-center w-100">
                      <div 
                        className="bg-info rounded-top shadow-sm w-50" 
                        style={{ 
                            height: `${(pedidosEnCamino / maxVal) * 100}%`, 
                            minHeight: '10px', 
                            transition: 'height 1s' 
                        }}
                      ></div>
                      <div className="mt-2 text-center">
                          <strong className="d-block">{pedidosEnCamino}</strong>
                          <small className="text-muted">En Camino</small>
                      </div>
                  </div>

                  {/* Barra Entregados */}
                  <div className="d-flex flex-column align-items-center w-100">
                      <div 
                        className="bg-success rounded-top shadow-sm w-50" 
                        style={{ 
                            height: `${(pedidosEntregados / maxVal) * 100}%`, 
                            minHeight: '10px', 
                            transition: 'height 1s' 
                        }}
                      ></div>
                      <div className="mt-2 text-center">
                          <strong className="d-block">{pedidosEntregados}</strong>
                          <small className="text-muted">Entregados</small>
                      </div>
                  </div>

                  {/* Barra Cancelados */}


              </div>
          </div>
      </div>

    </div>
  );
};

export default AdminDashboard;