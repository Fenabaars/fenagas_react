import React from 'react';

export const Footer = () => {
  return (
    <footer style={{ 
      background: '#222', 
      color: 'white', 
      textAlign: 'center', 
      padding: '20px', 
      marginTop: 'auto' 
    }}>
      <p>&copy; {new Date().getFullYear()} FeñaGas Servicios Profesionales - Expertos Certificados</p>
    </footer>
  );
};
export default Footer;