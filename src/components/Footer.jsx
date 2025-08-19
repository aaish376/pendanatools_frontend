// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <p>© 2025 PendanaTools. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <a href="https://asadalihere.netlify.app" className="hover:underline">Facebook</a>
        <a href="https://asadalihere.netlify.app" className="hover:underline">Twitter</a>
        <a href="mailto:contact@pendanatools.site" className="hover:underline">Email</a>
      </div>
    </footer>
  );
}

export default Footer;
