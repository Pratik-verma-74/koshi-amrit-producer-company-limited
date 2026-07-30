import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="bg-white inline-block p-2 rounded-lg mb-4">
              <img src="/logo.png" alt="Koshi Amrit Logo" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering Farmers. Building a Prosperous Future.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Farmer Registration</Link></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li className="pt-4"><Link to="/admin" className="text-gray-600 hover:text-gray-400 transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 KOSHI AMRIT PRODUCER COMPANY LIMITED. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
