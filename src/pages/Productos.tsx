// src/pages/Productos.tsx
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Swal from 'sweetalert2'; // 1. Importar SweetAlert

const Products = () => {
    const { products, addToCart } = useContext(ShopContext);

    // 2. Crear función envoltorio para agregar y mostrar alerta
    const handleAddToCart = (product: any) => {
        addToCart(product);
        
        // Configuración del "Toast"
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: 'success',
            title: `${product.name} agregado al carrito`
        });
    };

    return (
        <main className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5">Nuestro Catálogo de Gas</h1>
                <p className="lead text-muted">Selecciona el formato que necesitas</p>
            </div>

            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-12 col-md-6 col-lg-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-img-top p-3 text-center bg-light">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    style={{ maxHeight: '200px', objectFit: 'contain' }} 
                                    className="img-fluid"
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{product.name}</h5>
                                <p className="card-text text-muted small flex-grow-1">
                                    {product.description}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="h5 mb-0 text-primary">
                                        ${product.price.toLocaleString('es-CL')}
                                    </span>
                                    <small className={product.stock > 0 ? "text-success" : "text-danger"}>
                                        {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin Stock'}
                                    </small>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0 pb-3">
                                <button
                                    className={`btn w-100 ${product.stock > 0 ? 'btn-danger' : 'btn-secondary'}`}
                                    // 3. Usar nuestra nueva función aquí
                                    onClick={() => handleAddToCart(product)} 
                                    disabled={product.stock === 0}
                                >
                                    {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Products;