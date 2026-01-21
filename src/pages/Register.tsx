// src/pages/Register.tsx
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
         style={{ 
             background: `linear-gradient(rgba(26, 42, 58, 0.85), rgba(26, 42, 58, 0.85)), url('/img/iniciosecionimg.jpg')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
         }}>
         
      <div className="card shadow-lg border-0 p-4 m-3" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
            <div className="text-center mb-4">
                <h2 className="fw-bold text-dark">Feña<span className="text-warning">Gas</span></h2>
                <h4 className="mb-1">Crear Cuenta</h4>
                <p className="text-muted small">Únete para gestionar tus pedidos fácilmente</p>
            </div>

            <form>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Nombre Completo</label>
                        <input type="text" className="form-control" placeholder="Ej: Juan Pérez" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">RUT</label>
                        <input type="text" className="form-control" placeholder="12.345.678-9" required />
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold small">Correo Electrónico</label>
                        <input type="email" className="form-control" placeholder="correo@ejemplo.com" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Contraseña</label>
                        <input type="password" className="form-control" placeholder="********" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Confirmar Contraseña</label>
                        <input type="password" className="form-control" placeholder="********" required />
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold small">Teléfono</label>
                        <input type="tel" className="form-control" placeholder="+56 9 1234 5678" required />
                    </div>
                </div>

                <button type="submit" className="btn btn-warning w-100 mt-4 text-white fw-bold">
                    Registrarse
                </button>
            </form>

            <div className="text-center mt-3">
                <small>¿Ya tienes cuenta? <Link to="/login" className="text-decoration-none">Inicia sesión aquí</Link></small>
                <div className="mt-2">
                    <Link to="/" className="text-decoration-none text-secondary small">← Volver al inicio</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;