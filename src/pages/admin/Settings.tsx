import React, { useState } from 'react';

const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: 'FeñaGas',
    emailAdmin: 'admin@fenagas.cl',
    maintenanceMode: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configuración guardada correctamente');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--azul-seguridad)', borderBottom: '2px solid var(--naranja-llama)', paddingBottom: '10px' }}>⚙️ Configuración del Sistema</h2>
      
      <form onSubmit={handleSave} style={{ marginTop: '30px', background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#444' }}>Nombre del Sitio</label>
          <input 
            type="text" 
            name="siteName"
            value={formData.siteName} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} 
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#444' }}>Correo de Administración</label>
          <input 
            type="email" 
            name="emailAdmin"
            value={formData.emailAdmin} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} 
          />
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            name="maintenanceMode"
            checked={formData.maintenanceMode} 
            onChange={handleChange}
            id="maintenance"
            style={{ width: '20px', height: '20px' }}
          />
          <label htmlFor="maintenance" style={{ cursor: 'pointer', color: '#444' }}>Activar Modo Mantenimiento (Sitio no visible para clientes)</label>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
            <button type="button" style={{ padding: '10px 20px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding: '10px 20px', background: 'var(--azul-seguridad)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;