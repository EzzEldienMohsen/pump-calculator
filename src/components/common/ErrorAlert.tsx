/**
 * Error Alert Component
 * Displays error messages in a styled alert box
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

/**
 * ErrorAlert component
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert alert-error mb-6">
      <AlertCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorAlert;
