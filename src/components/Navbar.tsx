// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      {/* Barra de Alerta Superior */}
      <div className="alert-bar">
        🚨 ¿Huele a gas? Cierre la llave y llame ahora: <strong>555-900-FeñaGAS</strong>
      </div>

      {/* Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-azul sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Feña<span className="text-naranja">Gas</span>
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
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <Link to="/login" className="btn btn-naranja btn-sm px-3 rounded-1">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;