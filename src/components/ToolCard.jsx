// src/components/ToolCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ToolCard({ icon, title, description, buttonText, path }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center transition transform hover:scale-105">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={path}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default ToolCard;
