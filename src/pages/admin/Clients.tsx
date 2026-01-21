// src/pages/admin/Clients.tsx
const Clients = () => {
  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-primary fw-bold">👥 Gestión de Clientes</h2>

      {/* Estadísticas Rápidas */}
      <div className="row g-4 mb-4">
          <div className="col-md-4">
              <div className="card p-3 shadow-sm border-0 text-center">
                  <h3 className="fw-bold">10</h3>
                  <span className="text-muted">Total Clientes</span>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card p-3 shadow-sm border-0 text-center border-bottom border-success border-3">
                  <h3 className="fw-bold text-success">+2</h3>
                  <span className="text-muted">Nuevos este Mes</span>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card p-3 shadow-sm border-0 text-center border-bottom border-warning border-3">
                  <h3 className="fw-bold text-warning">6</h3>
                  <span className="text-muted">Clientes Frecuentes</span>
              </div>
          </div>
      </div>

      {/* Tabla y Buscador */}
      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
              <h5 className="mb-0 fw-bold">Directorio de Contactos</h5>
              <input 
                type="text" 
                className="form-control w-auto" 
                placeholder="🔍 Buscar por RUT..." 
              />
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>RUT / ID</th>
                            <th>Teléfono</th>
                            <th>Última Compra</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#C-010</td>
                            <td>Carlos Iturra Muñoz</td>
                            <td>15.678.901-2</td>
                            <td>+56 9 8877 6655</td>
                            <td>11/01/2026</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2">Ver Perfil</button>
                                <button className="btn btn-sm btn-outline-secondary">Historial</button>
                            </td>
                        </tr>
                        <tr>
                            <td>#C-009</td>
                            <td>Marcela Paz Lagos</td>
                            <td>18.234.567-k</td>
                            <td>+56 9 5544 3322</td>
                            <td>08/01/2026</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2">Ver Perfil</button>
                                <button className="btn btn-sm btn-outline-secondary">Historial</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Clients;