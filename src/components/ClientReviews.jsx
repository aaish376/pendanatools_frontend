// src/components/ClientReviews.jsx
import React from 'react';
import { clientReviews } from '../data';

function ClientReviews() {
  return (
    <div className="overflow-x-auto whitespace-nowrap py-10 bg-white scrollbar-hide">
      <div className="inline-flex animate-scroll gap-4  px-4">
        {clientReviews.map((review, i) => (
          <div
            key={i}
            className="bg-blue-100 p-4 rounded-lg shadow min-w-[250px]"
          >
            <h4 className="font-bold text-blue-600">{review.name}</h4>
            <div className="text-yellow-500 mb-2">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p className="text-sm text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientReviews;
