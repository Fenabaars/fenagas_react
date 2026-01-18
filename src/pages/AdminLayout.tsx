import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: 'calc(100vh - 80px)' }}>
      {/* --- SIDEBAR ÚNICO --- */}
      <aside style={{ background: '#2c3e50', color: 'white', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #34495e', marginBottom: '10px' }}>
            <p style={{ fontSize: '0.85rem', color: '#bdc3c7', marginBottom: '5px' }}>Bienvenido,</p>
            <strong style={{ fontSize: '1.1rem' }}>{user?.name || 'Admin'}</strong>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Link to="/admin" style={{ padding: '15px 25px', color: '#ecf0f1', textDecoration: 'none', borderBottom: '1px solid #34495e' }}>📊 Resumen</Link>
            <Link to="/admin/stock" style={{ padding: '15px 25px', color: '#ecf0f1', textDecoration: 'none', borderBottom: '1px solid #34495e' }}>📦 Inventario</Link>
            <Link to="/admin/clientes" style={{ padding: '15px 25px', color: '#ecf0f1', textDecoration: 'none', borderBottom: '1px solid #34495e' }}>👥 Clientes</Link>
            <Link to="/admin/configuracion" style={{ padding: '15px 25px', color: '#ecf0f1', textDecoration: 'none', borderBottom: '1px solid #34495e' }}>⚙️ Configuración</Link>
        </nav>

        <button 
          onClick={handleLogout}
          style={{ margin: '20px', padding: '10px', background: '#c0392b', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* --- CONTENIDO DINÁMICO (Aquí se cargan las páginas) --- */}
      <main style={{ background: '#f5f6fa', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;