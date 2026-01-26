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
    </div>
  );
};

export default AdminDashboard;