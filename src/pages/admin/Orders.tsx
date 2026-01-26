// src/pages/admin/Orders.tsx
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Swal from 'sweetalert2';

const AdminOrders = () => {
    const { orders, updateOrderStatus } = useContext(ShopContext);

    // Función para cambiar estado con alerta
    const handleChangeStatus = (orderId: string, newStatus: any) => {
        updateOrderStatus(orderId, newStatus);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Estado actualizado',
            showConfirmButton: false,
            timer: 1500
        });
    };

    // Función para obtener color según estado
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Pendiente': return 'bg-warning text-dark';
            case 'En Camino': return 'bg-info text-white';
            case 'Entregado': return 'bg-success';
            case 'Cancelado': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="mb-4 text-primary fw-bold">📋 Gestión de Pedidos</h2>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Dirección</th>
                                    <th>Total</th>
                                    <th>Estado Actual</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="fw-bold text-primary">#{order.id}</td>
                                            <td className="small">{order.date}</td>
                                            <td>
                                                <div className="fw-bold">{order.customerName}</div>
                                                <div className="small text-muted">
                                                    {order.userId === 'guest' ? '(Invitado)' : '(Registrado)'}
                                                </div>
                                                <div className="small text-muted">📞 {order.phone}</div>
                                            </td>
                                            <td className="small">
                                                {order.address}, {order.commune}
                                            </td>
                                            <td className="fw-bold">${order.total.toLocaleString('es-CL')}</td>
                                            <td>
                                                <span className={`badge ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-select form-select-sm"
                                                    value={order.status}
                                                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                                                    style={{ width: '130px' }}
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="En Camino">En Camino</option>
                                                    <option value="Entregado">Entregado</option>
                                                    <option value="Cancelado">Cancelar</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center py-5 text-muted">
                                            No hay pedidos registrados aún.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;