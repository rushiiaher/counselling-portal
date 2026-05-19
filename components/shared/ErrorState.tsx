import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = "Something went wrong.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50 rounded-lg border border-red-100">
      <h3 className="text-lg font-medium text-red-800 mb-2">Error Occurred</h3>
      <p className="text-red-600 text-sm mb-4">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded shadow-sm hover:bg-red-700 text-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
