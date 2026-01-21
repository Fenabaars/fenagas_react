// src/pages/admin/Stock.tsx
import { useContext } from 'react';
// Asegúrate de que esta ruta de importación sea correcta según tu estructura de carpetas
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import '../../styles/gestorstock.css';

const Stock = () => {
  const { products } = useContext(ShopContext);

  // ... resto del código igual, solo verifica que "products" tenga datos ...

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: '100vh' }}>
      <aside style={{ background: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to="/admin" style={{ padding: '15px 25px', color: '#bdc3c7', textDecoration: 'none' }}>📊 Resumen</Link>
          <Link to="/admin/stock" style={{ padding: '15px 25px', background: '#34495e', color: 'white', borderLeft: '4px solid #e67e22', textDecoration: 'none' }}>📦 Stock</Link>
        </nav>
      </aside>

      <main style={{ padding: '30px', background: '#f0f2f5' }}>
        <h2 style={{ color: '#1e3a8a', marginTop: 0 }}>📦 Gestión de Inventario</h2>

        {/* Tabla Detallada */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                <th style={{ padding: '12px', color: '#1e3a8a' }}>Producto</th>
                <th style={{ padding: '12px', color: '#1e3a8a' }}>Precio</th>
                <th style={{ padding: '12px', color: '#1e3a8a' }}>Stock</th>
                <th style={{ padding: '12px', color: '#1e3a8a' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}><strong>{product.name}</strong></td>
                  <td style={{ padding: '12px' }}>${product.price.toLocaleString('es-CL')}</td>
                  <td style={{ padding: '12px' }}>{product.stock}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      background: product.stock > 15 ? '#d4edda' : '#fff3cd',
                      color: product.stock > 15 ? '#155724' : '#856404'
                    }}>
                      {product.stock > 15 ? 'Óptimo' : 'Reponer'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Stock;