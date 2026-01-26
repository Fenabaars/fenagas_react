// src/pages/Profile.tsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  // Estado local para el formulario
  const [formData, setFormData] = useState({
      name: '',
      rut: '',
      phone: '',
      email: ''
  });

  // Cargar datos del usuario al abrir la página
  useEffect(() => {
      if (user) {
          setFormData({
              name: user.name || '',
              rut: user.rut || '',
              phone: user.phone || '',
              email: user.email || ''
          });
      }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Guardar cambios usando la función del contexto
      updateProfile({
          name: formData.name,
          rut: formData.rut,
          phone: formData.phone
          // El email no lo actualizamos por seguridad en este ejemplo
      });

      setIsEditing(false);

      Swal.fire({
          icon: 'success',
          title: 'Perfil Actualizado',
          text: 'Tus datos se han guardado correctamente.',
          timer: 1500,
          showConfirmButton: false
      });
  };

  if (!user) return <div className="container py-5 text-center">Debes iniciar sesión.</div>;

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
            <div className="card shadow-lg border-0">
                
                {/* Cabecera del Perfil */}
                <div className="card-header bg-primary text-white text-center py-4">
                    <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                         style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
                        👤
                    </div>
                    <h2 className="fw-bold mb-0">{user.name}</h2>
                    <p className="mb-0 opacity-75">{user.role === 'admin' ? 'Administrador' : 'Cliente Registrado'}</p>
                </div>

                <div className="card-body p-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="text-primary fw-bold">Información Personal</h4>
                        {!isEditing && (
                            <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setIsEditing(true)}
                            >
                                ✏️ Editar Perfil
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSave}>
                        <div className="row g-3">
                            {/* Nombre */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold small text-muted">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${isEditing ? '' : 'bg-light border-0'}`}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                />
                            </div>

                            {/* RUT */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold small text-muted">RUT</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${isEditing ? '' : 'bg-light border-0'}`}
                                    name="rut"
                                    value={formData.rut}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    placeholder="Sin registrar"
                                />
                            </div>

                            {/* Correo (Solo lectura) */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold small text-muted">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    className="form-control bg-light border-0"
                                    value={formData.email}
                                    readOnly
                                    title="El correo no se puede editar"
                                />
                                {isEditing && <small className="text-muted" style={{fontSize: '0.75rem'}}>* El correo no se puede modificar.</small>}
                            </div>

                            {/* Teléfono */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold small text-muted">Teléfono de Contacto</label>
                                <input 
                                    type="tel" 
                                    className={`form-control ${isEditing ? '' : 'bg-light border-0'}`}
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    placeholder="+56 9 ..."
                                />
                            </div>
                        </div>

                        {/* Botones de Acción (Solo visibles al editar) */}
                        {isEditing && (
                            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setIsEditing(false);
                                        // Restaurar datos originales
                                        setFormData({
                                            name: user.name,
                                            rut: user.rut || '',
                                            phone: user.phone || '',
                                            email: user.email
                                        });
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-success px-4">
                                    💾 Guardar Cambios
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;