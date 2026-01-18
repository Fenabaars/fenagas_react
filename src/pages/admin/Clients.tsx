import React, { useState } from 'react';
import { initialUsers } from '../../data/seed'; // Usamos los datos semilla o el contexto si lo prefieres

const Clients = () => {
  // En una app real, esto vendría del Contexto o una API
  const [clients, setClients] = useState(initialUsers.filter(u => u.role === 'client'));
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if(window.confirm('¿Estás seguro de eliminar este cliente?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div style={{ padding: '30px', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--azul-seguridad)', margin: 0 }}>👥 Gestión de Clientes</h2>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '20px', border: '1px solid #ddd', width: '300px' }}
          />
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f1f1' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Nombre</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>ID Cliente</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Estado</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#555' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#333' }}>{client.name}</td>
                <td style={{ padding: '15px', color: '#666' }}>{client.email}</td>
                <td style={{ padding: '15px', color: '#999' }}>#{client.id}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ background: '#d4edda', color: '#155724', padding: '5px 10px', borderRadius: '15px', fontSize: '0.85rem' }}>Activo</span>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleDelete(client.id)}
                    style={{ background: 'transparent', border: '1px solid #dc3545', color: '#dc3545', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredClients.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
            No se encontraron clientes.
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;