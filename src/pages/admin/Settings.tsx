// src/pages/admin/Settings.tsx
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { initialUsers } from '../../data/seed';
import type { User } from '../../types';

const Settings = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para búsqueda

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    // 1. Leemos los usuarios editados/registrados
    const storedUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
    
    // 2. Combinamos inteligentemente:
    // Si un usuario inicial (seed) ya está en storedUsers (porque fue editado), usamos la versión de storedUsers.
    const mergedUsers = [...initialUsers.map(seedUser => {
        const editedUser = storedUsers.find(u => u.id === seedUser.id || u.email === seedUser.email);
        return editedUser || seedUser;
    })];

    // 3. Agregamos los usuarios nuevos que no están en el seed
    storedUsers.forEach(storedUser => {
        if (!mergedUsers.some(u => u.id === storedUser.id)) {
            mergedUsers.push(storedUser);
        }
    });

    setUsers(mergedUsers);
  };

  // --- FILTRO DE BÚSQUEDA (NOMBRE O RUT) ---
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (user.rut && user.rut.includes(searchTerm))
  );

  const handleChangeRole = (user: User) => {
    if (user.email === 'admin@fenagas.cl') {
        Swal.fire('Acción denegada', 'No puedes modificar al Super Admin.', 'warning');
        return;
    }

    Swal.fire({
        title: `Editar Rol de ${user.name}`,
        text: `RUT: ${user.rut || 'No registrado'}`,
        input: 'select',
        inputOptions: {
            'client': 'Cliente',
            'admin': 'Administrador'
        },
        inputValue: user.role,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        confirmButtonColor: '#3085d6'
    }).then((result) => {
        if (result.isConfirmed) {
            const newRole = result.value;
            // Guardamos el cambio
            saveUserChange({ ...user, role: newRole });
            
            Swal.fire({
                icon: 'success',
                title: 'Rol actualizado',
                text: `${user.name} ahora es ${newRole === 'admin' ? 'Administrador' : 'Cliente'}.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
  };

  const handleDelete = (user: User) => {
    if (user.email === 'admin@fenagas.cl') {
        Swal.fire('Error', 'No puedes eliminar la cuenta principal.', 'error');
        return;
    }

    Swal.fire({
        title: '¿Eliminar usuario?',
        text: `Se eliminará a ${user.name} permanentemente.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            // Para "eliminar" un seed user, en esta demo simple lo filtramos visualmente
            // o lo guardamos en una lista negra. 
            // Para usuarios registrados, los borramos de LS.
            const storedUsers = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
            const newStored = storedUsers.filter((u: User) => u.id !== user.id);
            localStorage.setItem('fenagas_registered_users', JSON.stringify(newStored));
            
            loadUsers(); // Recargar
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
        }
    });
  };

  // Función auxiliar para guardar cambios permanentemente
  const saveUserChange = (updatedUser: User) => {
      const storedUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
      const index = storedUsers.findIndex(u => u.id === updatedUser.id);

      if (index !== -1) {
          // Si ya existía en LS, actualizar
          storedUsers[index] = updatedUser;
      } else {
          // Si era del Seed y es la primera vez que se edita, agregarlo a LS
          storedUsers.push(updatedUser);
      }

      localStorage.setItem('fenagas_registered_users', JSON.stringify(storedUsers));
      loadUsers(); // Refrescar la tabla
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-2 text-primary fw-bold">⚙️ Configuración</h2>
      <p className="text-muted mb-4">Gestión de roles, accesos y seguridad del sistema.</p>

      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
              <h5 className="mb-0 fw-bold">Usuarios del Sistema</h5>
              
              {/* --- BUSCADOR POR RUT --- */}
              <div className="input-group w-auto" style={{ minWidth: '300px' }}>
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
                            <th>Nombre</th>
                            <th>RUT</th>
                            <th>Email</th>
                            <th>Rol Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((u) => (
                                <tr key={u.id}>
                                    <td className="fw-bold">{u.name}</td>
                                    <td>
                                        {u.rut ? (
                                            <span className="badge bg-light text-dark border">{u.rut}</span>
                                        ) : (
                                            <span className="text-muted small">--</span>
                                        )}
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        {u.role === 'admin' ? (
                                            <span className="badge bg-primary">Administrador</span>
                                        ) : (
                                            <span className="badge bg-secondary">Cliente</span>
                                        )}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleChangeRole(u)}
                                            disabled={u.email === 'admin@fenagas.cl'}
                                        >
                                            ✏️ Rol
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(u)}
                                            disabled={u.email === 'admin@fenagas.cl'}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-muted">
                                    No se encontraron usuarios con ese RUT o nombre.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;