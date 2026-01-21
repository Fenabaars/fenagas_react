// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Productos from './pages/Productos'; // Asegúrate que el archivo se llame Productos.tsx
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Seguimiento from './pages/Seguimiento';

// Rutas Admin
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/AdminLayout'; // Si tienes un layout para admin
import AdminDashboard from './pages/AdminDashboard';
import Stock from './pages/admin/Stock';
// Importa aquí Clients o Settings si los tienes creados

function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seguimiento" element={<Seguimiento />} />

          {/* Rutas Privadas (Admin) */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
             <Route index element={<AdminDashboard />} />
             <Route path="stock" element={<Stock />} />
             {/* <Route path="clientes" element={<Clients />} /> */}
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;