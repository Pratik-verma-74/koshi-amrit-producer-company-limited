import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Tractor } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/#about' },
    { name: 'Farmer Services', path: '/#services' },
    { name: 'Contact', path: '/#contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.hash === path.substring(1);
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img src="/logo.png" alt="Koshi Amrit Logo" className="h-12 sm:h-14 w-auto object-contain" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-green ${
                  isActive(link.path) ? 'text-brand-green' : 'text-gray-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/register"
              className="ml-4 inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-leaf transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green"
            >
              Register as Farmer
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-brand-green focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-green hover:bg-brand-leaf"
              >
                Register as Farmer
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
