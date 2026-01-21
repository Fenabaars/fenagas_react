// src/components/Navbar.tsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión con alerta
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita la navegación por defecto del link
    
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "¿Seguro que quieres salir de tu cuenta?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
            title: '¡Hasta pronto!',
            text: 'Has cerrado sesión correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
        navigate('/'); // Redirigir al inicio
      }
    });
  };

  return (
    <>
      {/* Barra de Alerta Superior */}
      <div className="alert-bar bg-danger text-white text-center py-2 small fw-bold">
        🚨 ¿Huele a gas? Cierre la llave y llame ahora: <strong>555-900-FeñaGAS</strong>
      </div>

      {/* Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Feña<span style={{ color: '#b10101' }}>Gas</span>
          </Link>

          {/* Botón Hamburguesa para móviles */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/carrito">Carrito</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/seguimiento">Seguimiento</Link>
              </li>
              
              {/* Lógica de Sesión (Botón vs Dropdown) */}
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                {user ? (
                  // --- ESTADO LOGUEADO: DROPDOWN MENU ---
                  <div className="dropdown">
                    <button 
                        className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" 
                        type="button" 
                        id="userDropdown" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        <span>👤 Hola, {user.name.split(' ')[0]}</span>
                    </button>
                    
                    <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                        {/* Si es Admin, mostramos acceso al panel primero */}
                        {user.email.includes('admin') && (
                            <li>
                                <Link className="dropdown-item fw-bold text-warning" to="/admin">
                                    ⚙️ Panel Admin
                                </Link>
                            </li>
                        )}
                        
                        {/* Opciones Generales del Cliente */}
                        <li><Link className="dropdown-item" to="/perfil">👤 Ver Perfil</Link></li>
                        <li><Link className="dropdown-item" to="/mis-pedidos">📦 Mis Pedidos</Link></li>
                        <li><Link className="dropdown-item" to="/configuracion">⚙️ Configuración</Link></li>
                        
                        <li><hr className="dropdown-divider" /></li>
                        
                        {/* Opción Cerrar Sesión */}
                        <li>
                            <button 
                                className="dropdown-item text-danger" 
                                onClick={handleLogout}
                            >
                                🚪 Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                  </div>
                ) : (
                  // --- ESTADO INVITADO: BOTÓN LOGIN ---
                  <Link to="/login" className="btn btn-sm px-3 rounded-1 text-white fw-bold" style={{ backgroundColor: '#b10101' }}>
                    Iniciar Sesión
                  </Link>
                )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;