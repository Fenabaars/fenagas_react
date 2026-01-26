// src/pages/admin/Clients.tsx
import { useState, useEffect } from 'react';
import type { User } from '../../types';
import { initialUsers } from '../../data/seed'; 

const Clients = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      // 1. Leer los usuarios que se han registrado desde el formulario
      const storedUsers = localStorage.getItem('fenagas_registered_users');
      const parsedStored: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // 2. Combinarlos con los usuarios de prueba (seed)
      const allUsers = [...initialUsers, ...parsedStored];
      
      // 3. Filtrar para mostrar SOLO los que tienen rol de cliente
      const onlyClients = allUsers.filter(u => u.role === 'client');
      
      setClients(onlyClients);
  }, []);

  // Lógica de búsqueda (Por Nombre o por RUT)
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.rut && client.rut.includes(searchTerm))
  );

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-primary fw-bold">👥 Gestión de Clientes</h2>

      {/* Estadísticas Rápidas */}
      <div className="row g-4 mb-4">
          <div className="col-md-4">
              <div className="card p-3 shadow-sm border-0 text-center">
                  <h3 className="fw-bold">{clients.length}</h3>
                  <span className="text-muted">Total Clientes</span>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card p-3 shadow-sm border-0 text-center border-bottom border-success border-3">
                  <h3 className="fw-bold text-success">
                    {/* Contamos como "nuevos" los que tienen ID largo (generado por Date.now) */}
                    {clients.filter(c => c.id.length > 5).length}
                  </h3>
                  <span className="text-muted">Registrados Online</span>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card p-3 shadow-sm border-0 text-center border-bottom border-warning border-3">
                  <h3 className="fw-bold text-warning">--</h3>
                  <span className="text-muted">Frecuentes</span>
              </div>
          </div>
      </div>

      {/* Tabla y Buscador */}
      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
              <h5 className="mb-0 fw-bold">Directorio de Contactos</h5>
              <div className="input-group w-auto">
                  <span className="input-group-text bg-light">🔍</span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar por Nombre o RUT..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre Completo</th>
                            <th>RUT / ID</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client, index) => (
                                <tr key={index}>
                                    <td className="fw-bold">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '35px', height: '35px'}}>
                                                👤
                                            </div>
                                            {client.name}
                                        </div>
                                    </td>
                                    <td>
                                        {client.rut ? (
                                            <span className="badge bg-light text-dark border">{client.rut}</span>
                                        ) : (
                                            <span className="text-muted small fst-italic">No registrado</span>
                                        )}
                                    </td>
                                    <td>
                                        {client.phone || <span className="text-muted small">--</span>}
                                    </td>
                                    <td>{client.email}</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-primary me-2" title="Ver Perfil">
                                            📄 Perfil
                                        </button>
                                        <button className="btn btn-sm btn-outline-secondary" title="Ver Historial">
                                            🕒 Historial
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-5 text-muted">
                                    <h5 className="mt-2">No se encontraron clientes</h5>
                                    <p className="small">Intenta con otro término de búsqueda.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
          </div>
          <div className="card-footer bg-white text-muted small py-3">
              Mostrando {filteredClients.length} de {clients.length} clientes registrados.
          </div>
      </div>
    </div>
  );
};

export default Clients;