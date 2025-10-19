import React from 'react';

const ErrorScreen = ({ error, onBack }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <p className="text-red-600 mb-4">Error: {error}</p>
      <button onClick={onBack} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Go Back
      </button>
    </div>
  </div>
);

export default ErrorScreen;