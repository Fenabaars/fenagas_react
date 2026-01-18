import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro en una app real
    alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: `linear-gradient(rgba(26, 42, 58, 0.8), rgba(26, 42, 58, 0.8)), url('/img/iniciosecionimg.jpg')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(4, 19, 231, 0.2)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        <Link to="/" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a2a3a', textDecoration: 'none', display: 'block', marginBottom: '10px' }}>
          Feña<span style={{ color: '#f39c12' }}>Gas</span>
        </Link>
        <h2 style={{ color: '#1e3a8a', marginBottom: '20px' }}>Crear Cuenta</h2>

        <form onSubmit={handleRegister}>
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333', fontSize: '0.9rem' }}>Nombre Completo</label>
            <input type="text" placeholder="Ej: Juan Pérez" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333', fontSize: '0.9rem' }}>RUT</label>
            <input type="text" placeholder="12.345.678-9" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333', fontSize: '0.9rem' }}>Correo Electrónico</label>
            <input type="email" placeholder="correo@ejemplo.com" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333', fontSize: '0.9rem' }}>Contraseña</label>
            <input type="password" placeholder="********" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            background: '#ffd902',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '10px'
          }}>Registrarse</button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.85rem' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#1e3a8a', fontWeight: '600', textDecoration: 'none' }}>Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;