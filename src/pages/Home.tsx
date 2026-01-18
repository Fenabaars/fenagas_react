import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="hero" id="inicio" style={{
        backgroundImage: `linear-gradient(rgba(94, 94, 94, 0.4), rgba(114, 113, 113, 0.6)), url('/img/perrosgas.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '20px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Tu Seguridad es Nuestra Prioridad</h1>
        <p>Técnicos certificados en instalaciones domésticas, comerciales e industriales.</p>
        <a href="#servicios" className="btn-principal" style={{
          background: 'var(--naranja-llama)',
          color: 'white',
          padding: '12px 30px',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          marginTop: '20px',
          display: 'inline-block'
        }}>Nuestros Servicios</a>
      </section>

      <section className="servicios" id="servicios" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        padding: '50px 10%'
      }}>
        <div className="tarjeta" style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '5px solid var(--naranja-llama)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--azul-seguridad)' }}>Instalaciones</h3>
          <p>Montaje de tuberías, tanques estacionarios y conexión de estufas o calentadores.</p>
        </div>
        <div className="tarjeta" style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '5px solid var(--naranja-llama)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--azul-seguridad)' }}>Detección de Fugas</h3>
          <p>Localización precisa con equipo electrónico para garantizar que no haya riesgos.</p>
        </div>
        <div className="tarjeta" style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '5px solid var(--naranja-llama)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--azul-seguridad)' }}>Mantenimiento</h3>
          <p>Limpieza y ajuste de quemadores para un consumo de gas más eficiente y económico.</p>
        </div>
      </section>

      <section id="seguridad" style={{ padding: '40px 10%', background: '#fff', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--azul-seguridad)' }}>Esquema de Seguridad en el Hogar</h2>
        <p>Es fundamental conocer cómo se distribuye el gas en una propiedad para evitar accidentes.</p>
      </section>
    </>
  );
};

export default Home;