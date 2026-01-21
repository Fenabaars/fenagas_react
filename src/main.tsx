// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

// 1. IMPORTAR BOOTSTRAP (CSS y JS)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 2. Importar tus estilos personalizados (para las variables de color y ajustes finos)
import './styles/index.css'; 

import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  </StrictMode>,
);