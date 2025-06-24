import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { state } = useApp();

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && state.user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}