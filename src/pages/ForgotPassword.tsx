// src/pages/ForgotPassword.tsx
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
         style={{ 
             background: `linear-gradient(rgba(26, 42, 58, 0.8), rgba(26, 42, 58, 0.8)), url('/img/iniciosecionimg.jpg')`,
             backgroundSize: 'cover'
         }}>
         
      <div className="card shadow-lg border-0 p-4 m-3" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center">
            <h2 className="fw-bold mb-3">¿Olvidaste tu clave? 🔒</h2>
            <p className="text-muted small mb-4">
                Ingresa tu correo electrónico registrado y te enviaremos instrucciones para restablecer tu contraseña.
            </p>

            <form>
                <div className="mb-3 text-start">
                    <label className="form-label fw-bold">Correo Electrónico</label>
                    <input type="email" className="form-control" placeholder="ejemplo@correo.cl" required />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                    Enviar Instrucciones
                </button>
            </form>

            <div className="d-flex justify-content-between small mt-3">
                <Link to="/login" className="text-decoration-none">Volver a Login</Link>
                <Link to="/" className="text-decoration-none text-secondary">Ir al Inicio</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;