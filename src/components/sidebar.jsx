import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-56 h-screen bg-gradient-to-b from-blue-800 to-blue-500 p-4 shadow-lg">
      <ul className="menu bg-transparent rounded-box w-full text-white">
        <li className="mb-4">
          <Link to="/page1" className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10V4a2 2 0 10-4 0v6a5 5 0 105 5 5 5 0 00-5-5z"
              />
            </svg>
            <span className="text-lg font-medium">Temperatura</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/page2" className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-lg font-medium">Trajetória do Sol</span>
          </Link>
        </li>
        <li>
          <Link to="/page3" className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-lg transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-lg font-medium">Velocidade do Vento</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;



