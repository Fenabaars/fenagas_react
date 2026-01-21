// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import '../styles/index.css'; // Importa tus estilos originales

const Home = () => {
  return (
    <main>
        {/* Sección Hero */}
        <section className="hero" style={{ backgroundImage: "url('/img/perrosgas.webp')" }}>
            <div className="hero-content">
                <h1>Tu Seguridad es Nuestra Prioridad</h1>
                <p>Expertos certificados en instalaciones y gasfitería de alta presión.</p>
                <div className="hero-buttons">
                    <Link to="/productos" className="btn-primary">Ver Productos</Link>
                    <a href="#contacto" className="btn-secondary">Contáctanos</a>
                </div>
            </div>
        </section>

        {/* Sección Servicios */}
        <section className="servicios" id="servicios">
            <h2>Nuestros Servicios</h2>
            <div className="grid-servicios">
                <div className="card-servicio">
                    <div className="icono">🔧</div>
                    <h3>Instalaciones</h3>
                    <p>Redes de gas domiciliarias e industriales bajo norma SEC.</p>
                </div>
                <div className="card-servicio">
                    <div className="icono">⚠️</div>
                    <h3>Detección de Fugas</h3>
                    <p>Equipos de alta precisión para su tranquilidad.</p>
                </div>
                <div className="card-servicio">
                    <div className="icono">📅</div>
                    <h3>Mantenimiento</h3>
                    <p>Limpieza y calibración de estufas y calefots.</p>
                </div>
            </div>
        </section>

        {/* Sección Seguridad */}
        <section className="seguridad-home" style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ color: '#c0392b' }}>Esquema de Seguridad en el Hogar</h2>
            <p>Conoce los puntos clave para mantener tu hogar seguro.</p>
            {/* Asegúrate de tener esta imagen en public/img/ */}
            <img 
                src="/img/mapa.png" 
                alt="Esquema de seguridad" 
                style={{ maxWidth: '100%', borderRadius: '10px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
            />
        </section>
    </main>
  );
};

export default Home;