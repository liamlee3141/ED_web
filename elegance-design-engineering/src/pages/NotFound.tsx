import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 font-light mb-8">Page not found</p>
        <a href="/" className="text-gray-900 font-light hover:text-gray-700 underline">
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;