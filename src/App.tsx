import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contextos (Estado global)
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';

// Componentes Globales (Layout)
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas Públicas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/admin/Register';          // Migrado de crearusuario.html
import ForgotPassword from './pages/admin/ForgotPassword'; // Migrado de olvidolacontra.html
import Seguimiento from './pages/Seguimiento';
import Checkout from './pages/Checkout';

// Páginas Privadas (Admin)
import AdminDashboard from './pages/AdminDashboard';
import Stock from './pages/admin/Stock';          // Migrado de gestorstock.html

// Estilos Globales
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <div className="app-container">
            {/* Navbar: Visible en toda la aplicación */}
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

                {/* --- RUTAS PRIVADAS (ADMIN) --- 
                    Protegidas por ProtectedRoute. Si no es admin, redirige a Login.
                    Usamos sub-rutas para organizar el panel.
                */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute>
                      <Routes>
                        {/* /admin -> Muestra el Resumen General */}
                        <Route index element={<AdminDashboard />} />
                        
                        {/* /admin/stock -> Muestra el Gestor de Stock */}
                        <Route path="stock" element={<Stock />} />

                        {/* Aquí podrás añadir más rutas a futuro:
                            <Route path="clientes" element={<Clientes />} />
                            <Route path="configuracion" element={<Configuracion />} />
                        */}
                      </Routes>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>

            {/* Footer: Visible en toda la aplicación */}
            <Footer />
          </div>
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;