// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    
    if (success) {
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Credenciales incorrectas. Prueba admin@fenagas.cl / admin');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" 
         style={{ 
             background: `linear-gradient(rgba(26, 42, 58, 0.8), rgba(26, 42, 58, 0.8)), url('/img/iniciosecionimg.jpg')`,
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

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
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
                <label className="form-label fw-bold">Contraseña</label>
                <input 
                type="password" 
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required 
                />
            </div>

            <button type="submit" className="btn btn-warning w-100 text-white fw-bold mb-3">
                Iniciar Sesión
            </button>
            </form>

            <div className="mt-3">
            <Link to="/" className="text-decoration-none text-secondary">
                ← Volver al inicio
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;