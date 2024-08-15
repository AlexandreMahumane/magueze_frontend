import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          MAGUEZE
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link to={"/"} className="text-gray-600 hover:text-gray-800">
            Home
          </Link>

          <Link to={"/historic"}>Historic</Link>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center border rounded-full px-2 py-1 w-1/4">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full text-sm focus:outline-none text-gray-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Login
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
            Signup
          </button>
        </div>
      </div>
    </header>
  );
};


