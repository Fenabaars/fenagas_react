// src/pages/ClientOrders.tsx
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ClientOrders = () => {
    const { user } = useContext(AuthContext);
    const { orders } = useContext(ShopContext);

    // Filtrar solo las órdenes del usuario logueado
    const myOrders = orders.filter(order => order.userId === user?.id);

    return (
        <div className="container py-5" style={{ minHeight: '70vh' }}>
            <h2 className="mb-4 fw-bold">📦 Mis Pedidos</h2>

            {myOrders.length === 0 ? (
                <div className="alert alert-info">
                    Aún no has realizado ningún pedido.
                    <Link to="/productos" className="ms-2 fw-bold">Ir a la tienda</Link>
                </div>
            ) : (
                <div className="row g-4">
                    {myOrders.map(order => (
                        <div key={order.id} className="col-12">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                                    <div>
                                        <span className="fw-bold text-primary me-3">Orden #{order.id}</span>
                                        <span className="text-muted small">{order.date}</span>
                                    </div>
                                    <span className={`badge ${order.status === 'Entregado' ? 'bg-success' :
                                            order.status === 'En Camino' ? 'bg-info' : 'bg-warning text-dark'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h6 className="card-subtitle mb-2 text-muted">Productos:</h6>
                                            <ul className="list-group list-group-flush mb-3">
                                                {order.items.map(item => (
                                                    <li key={item.id} className="list-group-item px-0 d-flex justify-content-between">
                                                        <span>{item.name} <small className="text-muted">x{item.quantity}</small></span>
                                                        <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-md-4 border-start">
                                            <p className="mb-1"><strong>Total:</strong> ${order.total.toLocaleString('es-CL')}</p>

                                            {/* MOSTRAR CHOFER ASIGNADO */}
                                            <p className="mb-1">
                                                <strong>Chofer:</strong> {order.driver ? (
                                                    <span className="badge bg-secondary ms-1">🚚 {order.driver}</span>
                                                ) : (
                                                    <span className="text-muted fst-italic ms-1">Por asignar...</span>
                                                )}
                                            </p>

                                            <p className="mb-1"><strong>Despacho:</strong> {order.address}, {order.commune}</p>

                                            <div className="mt-3">
                                                <Link to={`/seguimiento?orden=${order.id}`} className="btn btn-outline-primary btn-sm w-100">
                                                    Rastrear Envío
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientOrders;