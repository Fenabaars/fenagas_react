// src/pages/AdminDashboard.tsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../styles/admin.css';

const AdminDashboard = () => {
  const { orders, updateOrderStatus, products } = useContext(ShopContext);

  // Filtramos pedidos pendientes para la vista principal
  const pendingOrders = orders.filter(o => o.status === 'Pendiente');

  return (
    <div className="admin-container">
        <aside>
            {/* Aquí iría tu Sidebar componentizado */}
            <nav>
                <h3>Panel Admin</h3>
                <p>Resumen</p>
                <p>Pedidos ({pendingOrders.length})</p>
            </nav>
        </aside>

        <main>
            <h2 style={{color: 'var(--azul-seguridad)'}}>Gestión de Pedidos</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Pedidos Totales</h3>
                    <p>{orders.length}</p>
                </div>
                <div className="stat-card" style={{borderBottomColor: '#f39c12'}}>
                    <h3>Pendientes</h3>
                    <p>{pendingOrders.length}</p>
                </div>
            </div>

            <div className="tabla-container">
                <h3>Listado de Pedidos</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>${order.total.toLocaleString('es-CL')}</td>
                                <td>
                                    <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    {order.status === 'Pendiente' && (
                                        <button className="btn-accion" onClick={() => updateOrderStatus(order.id, 'En Camino')}>
                                            Enviar 🚚
                                        </button>
                                    )}
                                    {order.status === 'En Camino' && (
                                        <button className="btn-accion" style={{background: 'green'}} onClick={() => updateOrderStatus(order.id, 'Entregado')}>
                                            Marcar Entregado ✅
                                        </button>
                                    )}
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

export default AdminDashboard;