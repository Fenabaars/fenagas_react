// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';

// Componentes Globales
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas Públicas (Tienda)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Seguimiento from './pages/Seguimiento';
import ClientOrders from './pages/ClientOrders'; 
import Profile from './pages/Profile'; // <--- IMPORTACIÓN NUEVA

// Páginas Privadas (Admin)
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import Stock from './pages/admin/Stock';
import Clients from './pages/admin/Clients';
import Settings from './pages/admin/Settings';
import AdminOrders from './pages/admin/Orders';

function App() {
  const location = useLocation();
  
  // Ocultar Navbar y Footer si estamos en una ruta de admin para evitar duplicados
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      
      {/* Solo mostramos el Navbar público si NO estamos en el panel de admin */}
      {!isAdminRoute && <Navbar />}
      
      <div className="flex-grow-1">
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar-clave" element={<ForgotPassword />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seguimiento" element={<Seguimiento />} />
          
          {/* --- RUTAS DE CLIENTE --- */}
          <Route path="/mis-pedidos" element={<ClientOrders />} />
          <Route path="/perfil" element={<Profile />} /> {/* <--- RUTA NUEVA */}

          {/* --- RUTAS PROTEGIDAS (ADMIN) --- */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
             {/* Dashboard Principal */}
             <Route index element={<AdminDashboard />} />
             
             {/* Sub-rutas de gestión */}
             <Route path="pedidos" element={<AdminOrders />} />
             <Route path="stock" element={<Stock />} />
             <Route path="clientes" element={<Clients />} />
             <Route path="configuracion" element={<Settings />} />
          </Route>
        </Routes>
      </div>

      {/* Solo mostramos el Footer público si NO estamos en admin */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;