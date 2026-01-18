import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: `linear-gradient(rgba(26, 42, 58, 0.8), rgba(26, 42, 58, 0.8)), url('/img/iniciosecionimg.jpg')`,
      backgroundSize: 'cover'
    }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(4, 19, 231, 0.3)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Link to="/" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a2a3a', marginBottom: '10px', textDecoration: 'none', display: 'block' }}>
          Feña<span style={{ color: '#f39c12' }}>Gas</span>
        </Link>
        <h2 style={{ color: '#1e3a8a', marginBottom: '10px' }}>¿Olvidaste tu clave?</h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '25px' }}>Ingresa tu correo y te enviaremos un código.</p>

        <form>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Correo Electrónico</label>
            <input type="email" placeholder="ejemplo@correo.cl" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#e0e307d4', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>Enviar cambio de contraseña</button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.85rem' }}>
          <Link to="/login" style={{ color: '#1e3a8a', fontWeight: '600', textDecoration: 'none' }}>Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;