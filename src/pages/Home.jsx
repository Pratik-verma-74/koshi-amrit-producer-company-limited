import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Leaf, DollarSign, Landmark, 
  HandHeart, Store, Sprout, ShieldCheck,
  MapPin, Phone, Mail, Clock
} from 'lucide-react';

const Home = () => {
  const services = [
    { icon: <Users className="w-8 h-8" />, title: 'किसान पंजीकरण एवं जुड़ाव' },
    { icon: <Leaf className="w-8 h-8" />, title: 'कृषि उपज की खरीद एवं संग्रहण' },
    { icon: <DollarSign className="w-8 h-8" />, title: 'उचित एवं प्रतिस्पर्धी मूल्य' },
    { icon: <Landmark className="w-8 h-8" />, title: 'वित्तीय एवं ऋण सहायता' },
    { icon: <HandHeart className="w-8 h-8" />, title: 'कृषि सहायता सेवाएँ' },
    { icon: <Store className="w-8 h-8" />, title: 'बाजार से जुड़ाव एवं विपणन' },
    { icon: <Sprout className="w-8 h-8" />, title: 'किसान विकास एवं सहयोग' },
    { icon: <ShieldCheck className="w-8 h-8" />, title: 'सरकार द्वारा अनुमोदित / अधिकृत किसान सुविधाएँ' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-brand-green text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background pattern could go here */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            KOSHI AMRIT <br className="hidden sm:block" />
            <span className="text-brand-accent">PRODUCER COMPANY LIMITED</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-4 font-medium text-green-100">
            Empowering Farmers. Building a Prosperous Future.
          </p>
          <p className="max-w-2xl mx-auto text-lg mb-10 text-green-50">
            Connecting farmers with agricultural opportunities, market support and farmer-focused services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-brand-green font-bold text-lg rounded-full shadow-lg hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300"
            >
              REGISTER AS A FARMER
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-brand-green transition-all duration-300"
            >
              LEARN ABOUT US
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About KOSHI Amrit</h2>
            <div className="w-24 h-1 bg-brand-leaf mx-auto rounded-full"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center text-lg text-gray-600 mb-12">
            <p>
              KOSHI Amrit Producer Company Limited is dedicated to supporting farmers and connecting them with organized agricultural opportunities. We believe in building a sustainable and prosperous future for our farming communities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Farmer registration and connection",
              "Agricultural produce procurement",
              "Fair and competitive pricing",
              "Financial and loan assistance",
              "Agricultural support services",
              "Market linkage and marketing",
              "Farmer development and support",
              "Authorized farmer facilities"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-brand-leaf flex-shrink-0"></div>
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Farmer Services</h2>
            <div className="w-24 h-1 bg-brand-leaf mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center group border border-gray-100"
              >
                <div className="w-16 h-16 bg-green-100 text-brand-leaf rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-brand-leaf mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-green-50 text-brand-green rounded-full flex items-center justify-center mb-4">
                <MapPin />
              </div>
              <h4 className="font-bold mb-2">Office Address</h4>
              <p className="text-gray-600">[Add actual address here]</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-green-50 text-brand-green rounded-full flex items-center justify-center mb-4">
                <Phone />
              </div>
              <h4 className="font-bold mb-2">Mobile</h4>
              <p className="text-gray-600">+91 9931655936<br />+91 8407878515</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-green-50 text-brand-green rounded-full flex items-center justify-center mb-4">
                <Mail />
              </div>
              <h4 className="font-bold mb-2">Email</h4>
              <p className="text-gray-600">[Add actual email here]</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-green-50 text-brand-green rounded-full flex items-center justify-center mb-4">
                <Clock />
              </div>
              <h4 className="font-bold mb-2">Office Hours</h4>
              <p className="text-gray-600">[Add actual hours here]</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
