import React from 'react';
import { useApp } from '../context/AppContext';
import Alert from './Alert';

export default function AlertContainer() {
  const { state, dispatch } = useApp();

  const handleCloseAlert = (id: string) => {
    dispatch({ type: 'REMOVE_ALERT', payload: id });
  };

  if (state.alerts.length === 0) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 space-y-2 max-w-md mx-auto">
      {state.alerts.map((alert) => (
        <Alert key={alert.id} alert={alert} onClose={handleCloseAlert} />
      ))}
    </div>
  );
}