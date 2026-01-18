import React from 'react';

const Seguimiento = () => {
  return (
    <div style={{ padding: '40px 10%', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ color: 'var(--azul-seguridad)', marginBottom: '5px' }}>Rastreo de tu Pedido</h2>
            <p style={{ color: '#666' }}>Orden ID: <strong>#FG-88210</strong></p>
        </div>

        {/* Barra de progreso visual simplificada */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px', position: 'relative', padding: '0 20px' }}>
            <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '4px', background: '#ddd', zIndex: 1 }}></div>
            <div style={{ zIndex: 3, textAlign: 'center' }}>
                <div style={{ width: '35px', height: '35px', background: 'var(--exito)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>✅</div>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Recibido</span>
            </div>
            <div style={{ zIndex: 3, textAlign: 'center' }}>
                <div style={{ width: '35px', height: '35px', background: 'var(--exito)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>🚚</div>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>En Camino</span>
            </div>
            <div style={{ zIndex: 3, textAlign: 'center' }}>
                <div style={{ width: '35px', height: '35px', background: '#ddd', color: '#999', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>🏠</div>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>Entregado</span>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
            <div style={{ background: '#e5e7eb', borderRadius: '15px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '2px solid #ddd' }}>
                 {/* Asegúrate de que mapa.png esté en public/img/ */}
                <img src="/img/mapa.png" alt="Mapa" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px', opacity: 0.6 }} />
                <div style={{ position: 'absolute', fontSize: '2rem' }}>🚚</div>
            </div>

            <div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderTop: '5px solid var(--azul-seguridad)', textAlign: 'center', marginBottom: '20px' }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#555', fontSize: '0.9rem', textTransform: 'uppercase' }}>Tu Chofer Asignado</h4>
                    <img src="/img/brayancito.png" alt="Chofer" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f0f0f0', marginBottom: '10px' }} />
                    <h3 style={{ margin: '5px 0', color: 'var(--azul-seguridad)' }}>"Brayancito"</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>⭐ 4.9 (500+ entregas)</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Seguimiento;