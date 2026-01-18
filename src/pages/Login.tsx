import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/sescionusuario.css'; // Asegúrate de tener este CSS o usa estilos inline

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
      // Redirigir según el rol
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      background: `linear-gradient(rgba(26, 42, 58, 0.8), rgba(26, 42, 58, 0.8)), url('/img/iniciosecionimg.jpg')`,
      backgroundSize: 'cover'
    }}>
      <div className="login-card" style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div className="logo-login" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a2a3a', marginBottom: '20px' }}>
          Feña<span style={{ color: '#f39c12' }}>Gas</span>
        </div>
        <h2>Bienvenido</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>Accede para gestionar tus compras</p>

        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label htmlFor="email" style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fenagas.cl" 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label htmlFor="password" style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Contraseña</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>

          <button type="submit" className="btn-login" style={{ width: '100%', padding: '12px', background: '#f39c12', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>
            Iniciar Sesión
          </button>
        </form>

        <div className="links" style={{ marginTop: '20px', fontSize: '0.85rem' }}>
          <Link to="/" className="btn-regresar" style={{ color: '#803a3a', textDecoration: 'none' }}>← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;