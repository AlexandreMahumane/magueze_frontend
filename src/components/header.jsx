import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  return (
    <header className="bg-green-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          MAGUEZE
        </div>

        <nav className="flex space-x-4">
          <Link to={"/"} className="text-white hover:text-green-200">
            Home
          </Link>
          <Link to={"/historic"} className="text-white hover:text-green-200">
            Historic
          </Link>
        </nav>

        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                Login
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700">
                Signup
              </button>
            </>
          ) : (
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
              onClick={() => setIsAuthenticated(false)} 
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
