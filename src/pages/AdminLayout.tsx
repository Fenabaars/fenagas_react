// src/pages/AdminLayout.tsx
import { useContext } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path ? 'active bg-primary text-white' : 'text-white-50 hover-white';

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '280px', minHeight: '100vh', position: 'fixed', left: 0, top: 0 }}>
        <div className="mb-4 text-center border-bottom pb-3 border-secondary">
            <h3 className="fw-bold">Feña<span className="text-danger">Gas</span> Admin</h3>
            <div className="small text-white-50 mt-2">
                Hola, <strong>{user?.name || 'Administrador'}</strong>
            </div>
        </div>

        <nav className="nav nav-pills flex-column flex-grow-1 gap-2">
            <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
                📊 Resumen General
            </Link>
            <Link to="/admin/stock" className={`nav-link ${isActive('/admin/stock')}`}>
                📦 Gestión de Stock
            </Link>
            <Link to="/admin/clientes" className={`nav-link ${isActive('/admin/clientes')}`}>
                👥 Clientes
            </Link>
            <Link to="/admin/configuracion" className={`nav-link ${isActive('/admin/configuracion')}`}>
                ⚙️ Configuración
            </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 mt-auto"
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-grow-1 p-4" style={{ marginLeft: '280px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;