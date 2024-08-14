// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">Logo</Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          <Link to="/map" className="hover:bg-gray-700 px-3 py-2 rounded">Mapa</Link>
          <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded">Contato</Link>
          <Link to="/about" className="hover:bg-gray-700 px-3 py-2 rounded">Sobre</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white">
          <div className="flex flex-col">
            <Link to="/" className="px-4 py-2 hover:bg-gray-700">Home</Link>
            <Link to="/map" className="px-4 py-2 hover:bg-gray-700">Mapa</Link>
            <Link to="/contact" className="px-4 py-2 hover:bg-gray-700">Contato</Link>
            <Link to="/about" className="px-4 py-2 hover:bg-gray-700">Sobre</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
