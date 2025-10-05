/**
 * Loading Spinner Component
 * Displays a loading spinner during async operations
 */

import React from 'react';

interface LoadingSpinnerProps {
  loading: boolean;
}

/**
 * LoadingSpinner component
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="flex justify-center mb-6">
      <span className="loading loading-spinner loading-lg text-indigo-600"></span>
    </div>
  );
};

export default LoadingSpinner;
