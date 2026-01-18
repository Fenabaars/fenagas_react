import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { orders, updateOrderStatus } = useContext(ShopContext);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Estado para filtrar la tabla (Todos vs Pendientes)
    const [filter, setFilter] = useState<'todos' | 'pendiente'>('todos');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Cálculos para las tarjetas de resumen
    const totalVentas = orders.reduce((acc, order) => acc + order.total, 0);
    const pedidosPendientes = orders.filter(o => o.status === 'Pendiente').length;
    const pedidosEnCamino = orders.filter(o => o.status === 'En Camino').length;

    // Filtrado de pedidos para la tabla
    const displayedOrders = filter === 'todos'
        ? orders
        : orders.filter(o => o.status === 'Pendiente');

    // Ordenar: Los más recientes primero
    displayedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: 'calc(100vh - 80px)' }}>

            {/* --- SIDEBAR --- */}
            <aside style={{ background: '#2c3e50', color: 'white', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #34495e', marginBottom: '10px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#bdc3c7', marginBottom: '5px' }}>Bienvenido,</p>
                    <strong style={{ fontSize: '1.1rem' }}>{user?.name || 'Administrador'}</strong>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Link to="/admin" style={{ padding: '15px 25px', background: '#34495e', color: 'white', borderLeft: '4px solid var(--naranja-llama)', textDecoration: 'none' }}>📦 Gestión Pedidos</Link>
                    <Link to="/admin/stock" style={{ padding: '15px 25px', color: '#bdc3c7', textDecoration: 'none', transition: '0.3s' }}>📊 Inventario / Stock</Link>
                    <Link to="/admin/clientes" style={{ padding: '15px 25px', color: '#bdc3c7', textDecoration: 'none', transition: '0.3s' }}>👥 Clientes</Link>
                    <Link to="/admin/configuracion" style={{ padding: '15px 25px', color: '#bdc3c7', textDecoration: 'none', transition: '0.3s' }}>⚙️ Configuración</Link>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{ margin: '20px', padding: '10px', background: '#c0392b', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Cerrar Sesión
                </button>
            </aside>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <main style={{ padding: '30px', background: '#f5f6fa' }}>
                <h2 style={{ color: 'var(--azul-seguridad)', marginTop: 0 }}>Panel de Control</h2>

                {/* Tarjetas de Estadísticas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderBottom: '4px solid var(--naranja-llama)' }}>
                        <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>Ingresos Totales</h3>
                        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0 0', color: '#2c3e50' }}>${totalVentas.toLocaleString('es-CL')}</p>
                    </div>

                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderBottom: '4px solid #f1c40f' }}>
                        <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>Pendientes</h3>
                        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0 0', color: '#f39c12' }}>{pedidosPendientes}</p>
                    </div>

                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderBottom: '4px solid #27ae60' }}>
                        <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>En Reparto</h3>
                        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0 0', color: '#27ae60' }}>{pedidosEnCamino}</p>
                    </div>
                </div>

                {/* Controles de la Tabla */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                        <h3 style={{ margin: 0, color: '#2c3e50' }}>Últimos Pedidos</h3>
                        <div>
                            <button
                                onClick={() => setFilter('todos')}
                                style={{ padding: '8px 15px', marginRight: '5px', border: '1px solid #ddd', background: filter === 'todos' ? '#ecf0f1' : 'white', borderRadius: '20px', cursor: 'pointer' }}
                            >
                                Todos
                            </button>
                            <button
                                onClick={() => setFilter('pendiente')}
                                style={{ padding: '8px 15px', border: '1px solid #f39c12', background: filter === 'pendiente' ? '#f39c12' : 'white', color: filter === 'pendiente' ? 'white' : '#f39c12', borderRadius: '20px', cursor: 'pointer' }}
                            >
                                Solo Pendientes
                            </button>
                        </div>
                    </div>

                    {/* Tabla de Pedidos */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ background: '#f8f9fa', color: '#7f8c8d', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>ID Pedido</th>
                                    <th style={{ padding: '12px' }}>Cliente</th>
                                    <th style={{ padding: '12px' }}>Fecha</th>
                                    <th style={{ padding: '12px' }}>Total</th>
                                    <th style={{ padding: '12px' }}>Estado</th>
                                    <th style={{ padding: '12px' }}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedOrders.length > 0 ? (
                                    displayedOrders.map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '12px', fontWeight: 'bold' }}>#{order.id}</td>
                                            <td style={{ padding: '12px' }}>
                                                {order.customerName}
                                                <div style={{ fontSize: '0.8rem', color: '#999' }}>{order.address}</div>
                                            </td>
                                            <td style={{ padding: '12px' }}>{order.date}</td>
                                            <td style={{ padding: '12px' }}>${order.total.toLocaleString('es-CL')}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    padding: '5px 10px',
                                                    borderRadius: '15px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 'bold',
                                                    background:
                                                        order.status === 'Pendiente' ? '#fff3cd' :
                                                            order.status === 'En Camino' ? '#d1ecf1' : '#d4edda',
                                                    color:
                                                        order.status === 'Pendiente' ? '#856404' :
                                                            order.status === 'En Camino' ? '#0c5460' : '#155724'
                                                }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                {order.status === 'Pendiente' && (
                                                    <button
                                                        onClick={() => updateOrderStatus(order.id, 'En Camino')}
                                                        style={{ padding: '6px 12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                                    >
                                                        Enviar 🚚
                                                    </button>
                                                )}
                                                {order.status === 'En Camino' && (
                                                    <button
                                                        onClick={() => updateOrderStatus(order.id, 'Entregado')}
                                                        style={{ padding: '6px 12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                                    >
                                                        Entregar ✅
                                                    </button>
                                                )}
                                                {order.status === 'Entregado' && (
                                                    <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Finalizado</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#999' }}>
                                            No hay pedidos que mostrar en esta categoría.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;