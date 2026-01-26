// src/pages/admin/Settings.tsx
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { initialUsers } from '../../data/seed';
import type { User } from '../../types';

const Settings = () => {
  const [users, setUsers] = useState<User[]>([]);

  // 1. Cargar usuarios al iniciar
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    // Leemos los registrados
    const storedUsers = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
    
    // Combinamos: Usuarios Iniciales (Seed) + Usuarios Registrados
    // Nota: Filtramos duplicados por si acaso
    const allUsers = [...initialUsers, ...storedUsers];
    setUsers(allUsers);
  };

  // 2. Función para Cambiar Rol
  const handleChangeRole = (user: User) => {
    // Protección: No editar al Super Admin original
    if (user.email === 'admin@fenagas.cl') {
        Swal.fire('Acción denegada', 'No puedes modificar al Super Admin del sistema.', 'warning');
        return;
    }

    Swal.fire({
        title: `Editar Rol de ${user.name}`,
        input: 'select',
        inputOptions: {
            'client': 'Cliente',
            'admin': 'Administrador'
        },
        inputValue: user.role,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#3085d6'
    }).then((result) => {
        if (result.isConfirmed) {
            const newRole = result.value;
            updateUserList(user.id, { role: newRole });
            
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

  // 3. Función para Eliminar Usuario
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
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Filtramos la lista para quitar al usuario
            const registeredUsers = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
            const updatedList = registeredUsers.filter((u: User) => u.id !== user.id);
            
            // Guardamos la nueva lista
            localStorage.setItem('fenagas_registered_users', JSON.stringify(updatedList));
            
            // Recargamos la vista
            loadUsers();

            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
        }
    });
  };

  // Helper para actualizar un usuario específico en LocalStorage
  const updateUserList = (userId: string, updates: Partial<User>) => {
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('fenagas_registered_users') || '[]');
      
      const userIndex = registeredUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
          registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updates };
          localStorage.setItem('fenagas_registered_users', JSON.stringify(registeredUsers));
          loadUsers(); // Recargar vista
      } else {
          // Si intentas editar un usuario del Seed (initialUsers) que no está en localStorage
          // En un sistema real esto se manejaría en backend. Aquí mostramos advertencia.
          Swal.fire('Aviso', 'Este usuario es del sistema base y sus cambios no persistirán permanentemente en esta demo.', 'info');
      }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-2 text-primary fw-bold">⚙️ Configuración</h2>
      <p className="text-muted mb-4">Gestión de roles, accesos y seguridad del sistema.</p>

      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Lista de Usuarios y Roles</h5>
              <span className="badge bg-light text-dark border">Total: {users.length}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>
                                    <div className="fw-bold">{u.name}</div>
                                    <div className="small text-muted">{u.rut || 'Sin RUT'}</div>
                                </td>
                                <td>{u.email}</td>
                                <td>
                                    {u.role === 'admin' ? (
                                        <span className="badge bg-primary">Administrador</span>
                                    ) : (
                                        <span className="badge bg-secondary">Cliente</span>
                                    )}
                                    {/* Etiqueta especial para el Super Admin */}
                                    {u.email === 'admin@fenagas.cl' && (
                                        <span className="badge bg-warning text-dark ms-1">Super Admin</span>
                                    )}
                                </td>
                                <td>
                                    {/* Botones de Acción */}
                                    <button 
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => handleChangeRole(u)}
                                        title="Cambiar Rol"
                                        disabled={u.email === 'admin@fenagas.cl'} // Deshabilita para el jefe
                                    >
                                        ✏️ Editar Rol
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(u)}
                                        title="Eliminar Usuario"
                                        disabled={u.email === 'admin@fenagas.cl'} // Deshabilita para el jefe
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;