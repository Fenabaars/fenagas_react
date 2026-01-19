import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contextos
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';

// Componentes de Layout y Seguridad
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/AdminLayout';

// Páginas Públicas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/admin/Register'; 
import ForgotPassword from './pages/admin/ForgotPassword';
import Seguimiento from './pages/Seguimiento';
import Checkout from './pages/Checkout';

// Páginas Privadas (Admin)
import AdminDashboard from './pages/AdminDashboard';
import Stock from './pages/admin/Stock';
import Clients from './pages/admin/Clients';
import Settings from './pages/admin/Settings';

// Estilos Globales
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <div className="app-container">
            {/* Navbar visible en toda la web */}
            <Navbar />
            
            <main className="main-content">
              <Routes>
                {/* --- RUTAS PÚBLICAS --- */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/recuperar-password" element={<ForgotPassword />} />
                <Route path="/seguimiento" element={<Seguimiento />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* --- RUTAS PROTEGIDAS (ADMIN) --- 
                    1. Protegidas por <ProtectedRoute> (Solo Admins)
                    2. Usan <AdminLayout> para tener el Sidebar fijo
                */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  {/* Estas rutas se renderizan donde está el <Outlet /> del AdminLayout */}
                  <Route index element={<AdminDashboard />} />          {/* /admin */}
                  <Route path="stock" element={<Stock />} />            {/* /admin/stock */}
                  <Route path="clientes" element={<Clients />} />       {/* /admin/clientes */}
                  <Route path="configuracion" element={<Settings />} /> {/* /admin/configuracion */}
                </Route>

              </Routes>
            </main>

            {/* Footer visible en toda la web */}
            <Footer />
          </div>
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;