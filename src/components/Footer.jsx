import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-green text-white pt-16 pb-8 border-t-[6px] border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="bg-white inline-block p-2 rounded-lg mb-6 shadow-md">
              <img src="/logo.png" alt="Koshi Amrit Logo" className="h-16 w-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2">KOSHI AMRIT PRODUCER COMPANY LIMITED</h3>
            <p className="text-green-100 text-sm leading-relaxed max-w-md">
              Empowering Farmers. Building a Prosperous Future. <br />
              Connecting farmers with organized agricultural opportunities, fair pricing, and technological advancement.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-accent">Quick Links</h4>
            <ul className="space-y-3 text-sm text-green-50">
              <li><a href="/#about" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> About Us</a></li>
              <li><Link to="/register" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> Farmer Registration</Link></li>
              <li><a href="/#services" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> Our Services</a></li>
              <li><a href="/#contact" className="hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-accent">Legal & Admin</h4>
            <ul className="space-y-3 text-sm text-green-50">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Terms & Conditions</a></li>
              <li className="pt-6"><Link to="/admin" className="inline-block px-4 py-2 border border-green-400 rounded-lg text-green-100 hover:bg-green-800 hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-green-200">
          <p>© 2026 KOSHI AMRIT PRODUCER COMPANY LIMITED. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">CIN: U01611BR2026PTC086791</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
