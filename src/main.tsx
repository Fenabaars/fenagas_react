// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

// Importa tus estilos globales (ajusta la ruta si es necesario)
import './styles/index.css'; 

// Importa los Proveedores (Providers)
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> {/* 1. Autenticación (Login) */}
      <ShopProvider> {/* 2. Datos del Carrito y Productos */}
        <BrowserRouter> {/* 3. Navegación (Rutas) */}
          <App />
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  </StrictMode>,
);