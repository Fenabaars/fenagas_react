// src/pages/AdminDashboard.tsx
const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-primary fw-bold">Panel de Control</h2>
      
      {/* Tarjetas de Estadísticas */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
            <div className="card border-0 shadow-sm border-start border-4 border-primary h-100">
                <div className="card-body">
                    <h6 className="text-muted text-uppercase mb-2">Pedidos Hoy</h6>
                    <h3 className="fw-bold text-dark">9</h3>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-0 shadow-sm border-start border-4 border-danger h-100">
                <div className="card-body">
                    <h6 className="text-muted text-uppercase mb-2">Stock Crítico</h6>
                    <h3 className="fw-bold text-danger">3</h3>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-0 shadow-sm border-start border-4 border-success h-100">
                <div className="card-body">
                    <h6 className="text-muted text-uppercase mb-2">Ventas del Mes</h6>
                    <h3 className="fw-bold text-success">$1.240.000</h3>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-0 shadow-sm border-start border-4 border-warning h-100">
                <div className="card-body">
                    <h6 className="text-muted text-uppercase mb-2">Repartidores Activos</h6>
                    <h3 className="fw-bold text-warning">3</h3>
                </div>
            </div>
        </div>
      </div>

      {/* Tabla de Últimos Pedidos */}
      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Últimos Pedidos Recibidos</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#8842</td>
                            <td>Juan Pérez</td>
                            <td>Cilindro 15kg</td>
                            <td>Av. Principal 123</td>
                            <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                            <td><button className="btn btn-sm btn-primary">Asignar Ruta</button></td>
                        </tr>
                        <tr>
                            <td>#8841</td>
                            <td>María López</td>
                            <td>Cilindro 11kg (x2)</td>
                            <td>Calle Los Olivos 45</td>
                            <td><span className="badge bg-success">Entregado</span></td>
                            <td><button className="btn btn-sm btn-secondary">Ver Detalle</button></td>
                        </tr>
                        <tr>
                            <td>#8840</td>
                            <td>Carlos Ruiz</td>
                            <td>Gas Catalítico</td>
                            <td>Pasaje Esmeralda 9</td>
                            <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                            <td><button className="btn btn-sm btn-primary">Asignar Ruta</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;