import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/authStore';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
