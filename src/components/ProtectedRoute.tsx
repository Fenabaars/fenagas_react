// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  // Si no hay usuario o no es admin, redirigir al login
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // ReactNode puede ser null, string, etc., pero React lo renderiza bien
  return <>{children}</>;
};

export default ProtectedRoute;