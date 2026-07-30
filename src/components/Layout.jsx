import React from 'react';
import { Outlet } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Call Button */}
      <a 
        href="tel:+918407878515" 
        className="fixed bottom-6 right-6 bg-brand-accent text-brand-green p-4 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center border border-yellow-200"
        title="Call for Help"
      >
        <PhoneCall size={28} className="animate-pulse" />
      </a>
    </div>
  );
};

export default Layout;
