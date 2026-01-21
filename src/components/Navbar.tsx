// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import '../styles/index.css'; // Asegúrate de que este CSS tenga tus estilos de navegación

const Navbar = () => {
  return (
    <header className="header-principal">
      <div className="alert-bar">
        🚨 Emergencia 24/7: 📞 <strong>555-900-FeñaGAS</strong>
      </div>
      
      <nav className="navbar">
        <div className="logo">
            {/* Si tienes un logo de imagen, úsalo aquí, si no, texto */}
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                🔥 FeñaGas
            </Link>
        </div>
        
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Producto</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          <li>
            {/* Aquí está el cambio del link para que se vea como el botón de la carpeta */}
            <Link to="/login" className="btn-login">
                Iniciar Sección
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;