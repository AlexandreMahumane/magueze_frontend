import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Links */}
        <div className="mb-4">
          <a href="#home" className="text-gray-400 hover:text-white mx-4">
            Home
          </a>
          <a href="#about" className="text-gray-400 hover:text-white mx-4">
            Sobre
          </a>
          <a href="#contact" className="text-gray-400 hover:text-white mx-4">
            Contato
          </a>
          <a href="#privacy" className="text-gray-400 hover:text-white mx-4">
            Privacidade
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-400">
          &copy; {new Date().getFullYear()} MAGUEZE. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};


