// src/components/Footer.jsx
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <nav>
            <h6 className="text-lg font-semibold mb-4">Services</h6>
            <ul>
              <li><a className="block text-gray-400 hover:text-white mb-2">Branding</a></li>
              <li><a className="block text-gray-400 hover:text-white mb-2">Design</a></li>
              <li><a className="block text-gray-400 hover:text-white mb-2">Marketing</a></li>
              <li><a className="block text-gray-400 hover:text-white">Advertisement</a></li>
            </ul>
          </nav>
          <nav>
            <h6 className="text-lg font-semibold mb-4">Company</h6>
            <ul>
              <li><a className="block text-gray-400 hover:text-white mb-2">About us</a></li>
              <li><a className="block text-gray-400 hover:text-white mb-2">Contact</a></li>
              <li><a className="block text-gray-400 hover:text-white mb-2">Jobs</a></li>
              <li><a className="block text-gray-400 hover:text-white">Press kit</a></li>
            </ul>
          </nav>
          <nav>
            <h6 className="text-lg font-semibold mb-4">Legal</h6>
            <ul>
              <li><a className="block text-gray-400 hover:text-white mb-2">Terms of use</a></li>
              <li><a className="block text-gray-400 hover:text-white mb-2">Privacy policy</a></li>
              <li><a className="block text-gray-400 hover:text-white">Cookie policy</a></li>
            </ul>
          </nav>
          <div>
            <h6 className="text-lg font-semibold mb-4">Newsletter</h6>
            <form>
              <fieldset className="flex flex-col space-y-4">
                <label className="text-gray-300">Enter your email address</label>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="username@site.com"
                    className="flex-1 px-4 py-2 rounded-l-md border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Subscribe</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};




