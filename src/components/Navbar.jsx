import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  const navLinks = {
    en: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/#about' },
      { name: 'Farmer Services', path: '/#services' },
      { name: 'Our Network', path: '/network' },
      { name: 'Verify ID', path: '/verify' },
      { name: 'Contact', path: '/#contact' },
    ],
    hi: [
      { name: 'होम', path: '/' },
      { name: 'हमारे बारे में', path: '/#about' },
      { name: 'किसान सेवाएँ', path: '/#services' },
      { name: 'हमारा नेटवर्क', path: '/network' },
      { name: 'ID वेरिफाई करें', path: '/verify' },
      { name: 'संपर्क करें', path: '/#contact' },
    ]
  };

  const currentLinks = navLinks[language];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.hash === path.substring(1);
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img src="/logo.png" alt="Koshi Amrit Logo" className="h-14 sm:h-20 w-auto object-contain py-1" />
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {currentLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-base font-semibold transition-all duration-300 hover:text-brand-green relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-green after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(link.path) ? 'text-brand-green after:w-full' : 'text-gray-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-bold text-brand-green ml-2"
              title="Change Language"
            >
              <Languages size={18} />
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>

            <Link
              to="/register"
              className="ml-2 inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-brand-green hover:bg-brand-leaf transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green"
            >
              {language === 'en' ? 'Register as Farmer' : 'किसान पंजीकरण करें'}
            </Link>
          </div>

          <div className="flex items-center lg:hidden gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-full bg-gray-100 text-brand-green hover:bg-gray-200"
            >
              <Languages size={20} />
              <span className="ml-1 text-xs font-bold">{language === 'en' ? 'HI' : 'EN'}</span>
            </button>
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
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
            {currentLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`block px-3 py-3 rounded-md text-base font-bold ${isActive(link.path) ? 'text-brand-green bg-green-50' : 'text-gray-700 hover:text-brand-green hover:bg-gray-50'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-brand-green hover:bg-brand-leaf"
              >
                {language === 'en' ? 'Register as Farmer' : 'किसान पंजीकरण करें'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
