import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contextos
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';

// Componentes Globales
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
// Asegúrate de tener estas páginas creadas o comenta las líneas si aún no existen:
import Seguimiento from './pages/Seguimiento'; 
import Checkout from './pages/Checkout'; 

// Estilos Globales
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <div className="app-container">
            {/* Navbar visible en todas las páginas */}
            <Navbar />
            
            <main className="main-content">
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/login" element={<Login />} />
                <Route path="/seguimiento" element={<Seguimiento />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* Rutas Privadas (Admin) */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>

            {/* Footer visible en todas las páginas */}
            <Footer />
          </div>
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;