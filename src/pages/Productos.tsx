// src/pages/Products.tsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../styles/producto.css'; // Asegúrate de copiar tu CSS aquí

const Products = () => {
    const { products, addToCart } = useContext(ShopContext);

    return (
        <main className="contenedor-productos">
            <div className="titulo-pagina">
                <h1>Nuestro Catálogo de Gas</h1>
                <p>Selecciona el formato que necesitas</p>
            </div>

            <div className="grid-productos">
                {products.map((product) => (
                    <div key={product.id} className="tarjeta-producto">
                        <div className="producto-foto">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="info-producto">
                            <h3>{product.name}</h3>
                            <p className="descripcion">{product.description}</p>
                            <div className="precio">${product.price.toLocaleString('es-CL')}</div>
                            <p>Stock: {product.stock}</p>
                            <button
                                className="btn-comprar"
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                            >
                                {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Products;