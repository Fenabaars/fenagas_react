// src/pages/admin/Settings.tsx
const Settings = () => {
  return (
    <div className="container-fluid">
      <h2 className="mb-2 text-primary fw-bold">⚙️ Configuración</h2>
      <p className="text-muted mb-4">Gestión de roles, accesos y seguridad del sistema.</p>

      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Lista de Empleados</h5>
              <button className="btn btn-success btn-sm">+ Nuevo Miembro</button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre Empleado</th>
                            <th>Rol</th>
                            <th>Permisos</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Fernando "Feña" Gas</strong></td>
                            <td><span className="badge bg-purple text-white" style={{backgroundColor: '#6f42c1'}}>Super Admin</span></td>
                            <td>Acceso Total (Dueño)</td>
                            <td><span className="badge bg-success">Activo</span></td>
                            <td><button className="btn btn-sm btn-secondary" disabled>Inamovible</button></td>
                        </tr>
                        <tr>
                            <td>Juan Pérez Soto</td>
                            <td><span className="badge bg-info text-dark">Administrador</span></td>
                            <td>Gestión de Stock</td>
                            <td><span className="badge bg-success">Activo</span></td>
                            <td><button className="btn btn-sm btn-outline-primary">Editar</button></td>
                        </tr>
                        <tr>
                            <td>Roberto Contador S.A.</td>
                            <td><span className="badge bg-light text-dark border">Contador</span></td>
                            <td>Solo Ventas</td>
                            <td><span className="badge bg-success">Activo</span></td>
                            <td><button className="btn btn-sm btn-outline-primary">Editar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;