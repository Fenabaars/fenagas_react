// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      {/* Sección Hero */}
      <section className="hero-section">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">Tu Seguridad es Nuestra Prioridad</h1>
          <p className="lead fs-4 mb-4">Técnicos certificados en instalaciones domésticas, comerciales e industriales.</p>
          <div className="d-flex gap-3 justify-content-center">
             <Link to="/productos" className="btn btn-naranja btn-lg">Ver Productos</Link>
             <a href="#contacto" className="btn btn-outline-light btn-lg">Contáctanos</a>
          </div>
        </div>
      </section>

      {/* Sección Servicios (Usando Grid de Bootstrap) */}
      <section className="py-5" id="servicios">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: 'var(--azul-seguridad)' }}>
            Nuestros Servicios
          </h2>
          
          <div className="row g-4">
            {/* Tarjeta 1 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm service-card border-0">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">🔧</div>
                  <h3 className="card-title h4">Instalaciones</h3>
                  <p className="card-text text-muted">
                    Montaje de tuberías, tanques estacionarios y conexión de estufas bajo norma SEC.
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm service-card border-0">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">⚠️</div>
                  <h3 className="card-title h4">Detección de Fugas</h3>
                  <p className="card-text text-muted">
                    Localización precisa con equipo electrónico para garantizar que no haya riesgos.
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm service-card border-0">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">📅</div>
                  <h3 className="card-title h4">Mantenimiento</h3>
                  <p className="card-text text-muted">
                    Limpieza y ajuste de quemadores para un consumo de gas más eficiente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Seguridad */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-3 fw-bold" style={{ color: '#c0392b' }}>Esquema de Seguridad en el Hogar</h2>
          <p className="text-muted mb-4">
            Es fundamental conocer cómo se distribuye el gas en una propiedad para evitar accidentes.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <img 
                src="/img/mapa.png" 
                alt="Esquema de seguridad" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;