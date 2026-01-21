// src/pages/Register.tsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { AuthContext } from '../context/AuthContext';
import type { User } from '../types';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); // Usamos la función del contexto

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
      name: '',
      rut: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
  });

  // Maneja los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
        Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        return;
    }

    // 2. Crear objeto de usuario (Compatible con tu interfaz User)
    const newUser: User = {
        id: Date.now().toString(), // Generamos ID único simple
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'client' // Por defecto todos los registros son clientes
        // Nota: RUT y Teléfono no están en tu interfaz User básica, 
        // pero se guardarán en localStorage aunque TypeScript no los valide estrictamente aquí.
    };

    // 3. Intentar registrar en el Contexto
    const success = register(newUser);

    if (success) {
        Swal.fire({
            title: '¡Registro Exitoso!',
            text: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
            icon: 'success',
            confirmButtonText: 'Ir al Login',
            confirmButtonColor: '#f39c12'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login');
            }
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'El correo electrónico ya está registrado.',
            icon: 'error',
            confirmButtonColor: '#d33'
        });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
         style={{ 
             background: `linear-gradient(rgba(26, 42, 58, 0.85), rgba(26, 42, 58, 0.85)), url('/img/iniciosecionimg.jpg')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
         }}>
         
      <div className="card shadow-lg border-0 p-4 m-3" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
            <div className="text-center mb-4">
                <h2 className="fw-bold text-dark">Feña<span className="text-warning">Gas</span></h2>
                <h4 className="mb-1">Crear Cuenta</h4>
                <p className="text-muted small">Únete para gestionar tus pedidos fácilmente</p>
            </div>

            <form onSubmit={handleRegister}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Nombre Completo</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ej: Juan Pérez" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">RUT</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="12.345.678-9" 
                            name="rut"
                            value={formData.rut}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold small">Correo Electrónico</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="correo@ejemplo.com" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="********" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="********" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold small">Teléfono</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            placeholder="+56 9 1234 5678" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-warning w-100 mt-4 text-white fw-bold">
                    Registrarse
                </button>
            </form>

            <div className="text-center mt-3">
                <small>¿Ya tienes cuenta? <Link to="/login" className="text-decoration-none">Inicia sesión aquí</Link></small>
                <div className="mt-2">
                    <Link to="/" className="text-decoration-none text-secondary small">← Volver al inicio</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;