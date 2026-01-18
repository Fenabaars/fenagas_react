import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export const Navbar = () => {
  const { cart } = useContext(ShopContext);
  return (
    <header className="header">
      <Link to="/" className="logo">Feña<span>Gas</span></Link>
      <nav className="navbar">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito ({cart.length})</Link>
        <Link to="/seguimiento">Seguimiento</Link>
        <Link to="/login" className="btn-login">Iniciar Sesión</Link>
      </nav>
    </header>
  );
};