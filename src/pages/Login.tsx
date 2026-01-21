// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    
    if (success) {
      // Alerta de Éxito
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      // Alerta de Error
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas. Prueba admin@fenagas.cl / admin',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    // ... (El resto del JSX se mantiene idéntico al que ya tienes)
    <div className="d-flex align-items-center justify-content-center min-vh-100" 
         style={{ 
             background: `linear-gradient(rgba(26, 42, 58, 0.85), rgba(26, 42, 58, 0.85)), url('/img/iniciosecionimg.jpg')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
         }}>
         
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center">
            <h2 className="mb-4 fw-bold text-dark">
                Feña<span className="text-warning">Gas</span>
            </h2>
            <h4 className="mb-3">Bienvenido</h4>
            <p className="text-muted mb-4">Accede para gestionar tus compras</p>

            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-3">
                  <label className="form-label fw-bold small">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@fenagas.cl" 
                    required 
                  />
              </div>

              <div className="mb-4">
                  <label className="form-label fw-bold small">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required 
                  />
              </div>

              <button type="submit" className="btn btn-warning w-100 text-white fw-bold mb-3 shadow-sm">
                  Iniciar Sesión
              </button>
            </form>

            <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
               <Link to="/recuperar-clave" className="text-decoration-none small text-muted">
                 ¿Olvidaste tu clave?
               </Link>
               <Link to="/registro" className="text-decoration-none small fw-bold text-primary">
                 Crear Cuenta Nueva
               </Link>
            </div>

            <div className="border-top pt-3">
              <Link to="/" className="text-decoration-none text-secondary small">
                  ← Volver a la Tienda
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;