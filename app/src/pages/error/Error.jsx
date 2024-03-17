import React from 'react';

const ErrorPage = ({ errorMessage, buttonText, buttonLink }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
      <p className="text-lg text-gray-700 mb-8">{errorMessage}</p>
      {buttonText && buttonLink && (
        <a href={buttonLink} className="text-blue-500 hover:underline">
          {buttonText}
        </a>
      )}
    </div>
  );
};

export default ErrorPage;
