import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Alert as AlertType } from '../types';

interface AlertProps {
  alert: AlertType;
  onClose: (id: string) => void;
}

export default function Alert({ alert, onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(alert.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [alert.id, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  };

  const Icon = icons[alert.type];

  return (
    <div className={`border rounded-md p-4 ${colors[alert.type]} animate-slide-up`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${iconColors[alert.type]} ml-3`} />
        <div className="flex-1">
          <p className="text-sm font-medium">{alert.message}</p>
        </div>
        <button
          onClick={() => onClose(alert.id)}
          className="mr-2 hover:opacity-75"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}