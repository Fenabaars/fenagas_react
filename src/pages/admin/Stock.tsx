import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const Stock = () => {
  const { products } = useContext(ShopContext);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: '100vh' }}>
      {/* Sidebar Simplificado (Deberías componentizarlo para no repetirlo) */}
      <aside style={{ background: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/admin" style={{ padding: '15px 25px', color: '#bdc3c7', textDecoration: 'none' }}>📊 Resumen</Link>
            <Link to="/admin/stock" style={{ padding: '15px 25px', background: '#34495e', color: 'white', borderLeft: '4px solid var(--naranja-llama)', textDecoration: 'none' }}>📦 Stock</Link>
        </nav>
      </aside>

      <main style={{ padding: '30px', background: '#f0f2f5' }}>
        <h2 style={{ color: 'var(--azul-seguridad)', marginTop: 0 }}>📦 Gestión de Inventario</h2>

        {/* Tarjetas de Resumen */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {products.map(product => (
            <div key={product.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', borderBottom: `4px solid ${product.stock < 15 ? 'var(--naranja-llama)' : 'var(--azul-seguridad)'}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{product.name}</h3>
              <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0 0 0', color: 'var(--azul-seguridad)' }}>
                {product.stock} <small style={{ fontSize: '0.8rem', color: '#666' }}>unid.</small>
              </p>
              {product.stock < 15 && <p style={{ color: 'var(--naranja-llama)', fontSize: '0.7rem', margin: '5px 0 0 0' }}>⚠️ STOCK BAJO</p>}
            </div>
          ))}
        </div>

        {/* Tabla Detallada */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Detalle de Carga en Bodega</h3>
            <button style={{ padding: '5px 10px', background: 'var(--exito)', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>+ Registrar Entrada</button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                <th style={{ padding: '12px', color: 'var(--azul-seguridad)' }}>Producto</th>
                <th style={{ padding: '12px', color: 'var(--azul-seguridad)' }}>Precio</th>
                <th style={{ padding: '12px', color: 'var(--azul-seguridad)' }}>Stock Actual</th>
                <th style={{ padding: '12px', color: 'var(--azul-seguridad)' }}>Estado</th>
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