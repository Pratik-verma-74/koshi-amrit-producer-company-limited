import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFarmers } from '../utils/mockStore';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Users, Leaf, DollarSign, Landmark, 
  HandHeart, Store, Sprout, ShieldCheck,
  MapPin, Phone, Mail, Clock, Globe
} from 'lucide-react';

const Home = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalArea: 0,
    districts: 0,
    villages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getFarmers();
      
      const totalArea = data.reduce((sum, f) => {
        const area = parseFloat(f.land_area) || 0;
        return sum + area;
      }, 0).toFixed(0);

      const districtsMap = new Set();
      const villagesMap = new Set();

      data.forEach(f => {
        if (f.district) districtsMap.add(f.district.trim().toLowerCase());
        if (f.village) villagesMap.add(f.village.trim().toLowerCase());
      });

      setStats({
        totalFarmers: data.length,
        totalArea: totalArea,
        districts: districtsMap.size,
        villages: villagesMap.size
      });
    };
    fetchStats();
  }, []);

  const t = {
    en: {
      heroTitle2: "PRODUCER COMPANY LIMITED",
      heroSubtitle: "Empowering Farmers. Building a Prosperous Future.",
      heroDesc: "Connecting farmers with agricultural opportunities, market support and farmer-focused services.",
      btnRegister: "REGISTER AS A FARMER",
      btnLearn: "LEARN ABOUT US",
      aboutTitle: "About KOSHI Amrit",
      aboutP1: "KOSHI Amrit Producer Company Limited is dedicated to supporting farmers and connecting them with organized agricultural opportunities. We believe in building a sustainable and prosperous future for our farming communities.",
      aboutP2: "Our mission is to empower rural communities by providing them with the right tools, knowledge, and market access. Through collective effort, we ensure fair pricing, technological advancement, and overall growth for every farmer associated with us.",
      companyInfo: "Company Information",
      boardTitle: "Board of Directors & Members",
      boardDesc: "Meet the dedicated leadership team driving the vision of Koshi Amrit Producer Company Limited.",
      servicesTitle: "Our Farmer Services",
      networkTitle: "Our Growing Network",
      networkDesc: "We are expanding rapidly across India. See the impact we've made so far.",
      farmersJoined: "Farmers Joined",
      acresLand: "Acres of Land",
      districts: "Districts",
      villages: "Villages",
      viewMap: "View Detailed Network Map",
      contactTitle: "Contact Us",
      contactDesc: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      sendMessage: "Send us a Message",
      contactInfo: "Contact Information",
      officeAddress: "Office Address",
      phone: "Phone Number",
      email: "Email Address"
    },
    hi: {
      heroTitle2: "प्रोड्यूसर कंपनी लिमिटेड",
      heroSubtitle: "किसानों को सशक्त बनाना। एक समृद्ध भविष्य का निर्माण।",
      heroDesc: "किसानों को कृषि अवसरों, बाज़ार समर्थन और किसान-केंद्रित सेवाओं से जोड़ना।",
      btnRegister: "किसान पंजीकरण करें",
      btnLearn: "हमारे बारे में जानें",
      aboutTitle: "कोशी अमृत के बारे में",
      aboutP1: "कोशी अमृत प्रोड्यूसर कंपनी लिमिटेड किसानों का समर्थन करने और उन्हें संगठित कृषि अवसरों से जोड़ने के लिए समर्पित है। हम अपने कृषक समुदायों के लिए एक स्थायी और समृद्ध भविष्य के निर्माण में विश्वास करते हैं।",
      aboutP2: "हमारा मिशन ग्रामीण समुदायों को सही उपकरण, ज्ञान और बाजार पहुंच प्रदान करके उन्हें सशक्त बनाना है। सामूहिक प्रयास के माध्यम से, हम हमसे जुड़े हर किसान के लिए उचित मूल्य, तकनीकी प्रगति और समग्र विकास सुनिश्चित करते हैं।",
      companyInfo: "कंपनी की जानकारी",
      boardTitle: "निदेशक मंडल और सदस्य",
      boardDesc: "कोशी अमृत प्रोड्यूसर कंपनी लिमिटेड के दृष्टिकोण को आगे बढ़ाने वाली समर्पित नेतृत्व टीम से मिलें।",
      servicesTitle: "हमारी किसान सेवाएँ",
      networkTitle: "हमारा बढ़ता नेटवर्क",
      networkDesc: "हम तेजी से विस्तार कर रहे हैं। हमारे द्वारा अब तक किए गए प्रभाव को देखें।",
      farmersJoined: "पंजीकृत किसान",
      acresLand: "एकड़ भूमि",
      districts: "जिले",
      villages: "गाँव",
      viewMap: "विस्तृत नेटवर्क मैप देखें",
      contactTitle: "संपर्क करें",
      contactDesc: "क्या आपके कोई प्रश्न हैं? हमें आपकी सहायता करने में खुशी होगी। हमें एक संदेश भेजें।",
      sendMessage: "हमें संदेश भेजें",
      contactInfo: "संपर्क जानकारी",
      officeAddress: "कार्यालय का पता",
      phone: "फ़ोन नंबर",
      email: "ईमेल पता"
    }
  }[language];

  const services = [
    { icon: <Users className="w-8 h-8" />, title: language === 'hi' ? 'किसान पंजीकरण एवं जुड़ाव' : 'Farmer Registration & Integration' },
    { icon: <Leaf className="w-8 h-8" />, title: language === 'hi' ? 'कृषि उपज की खरीद एवं संग्रहण' : 'Procurement of Produce' },
    { icon: <DollarSign className="w-8 h-8" />, title: language === 'hi' ? 'उचित एवं प्रतिस्पर्धी मूल्य' : 'Fair & Competitive Pricing' },
    { icon: <Landmark className="w-8 h-8" />, title: language === 'hi' ? 'वित्तीय एवं ऋण सहायता' : 'Financial & Credit Support' },
    { icon: <HandHeart className="w-8 h-8" />, title: language === 'hi' ? 'कृषि सहायता सेवाएँ' : 'Agricultural Support Services' },
    { icon: <Store className="w-8 h-8" />, title: language === 'hi' ? 'बाजार से जुड़ाव एवं विपणन' : 'Market Linkage & Marketing' },
    { icon: <Sprout className="w-8 h-8" />, title: language === 'hi' ? 'किसान विकास एवं सहयोग' : 'Farmer Development' },
    { icon: <ShieldCheck className="w-8 h-8" />, title: language === 'hi' ? 'सरकार द्वारा अनुमोदित सुविधाएँ' : 'Govt. Authorized Facilities' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image with Darker Overlay */}
        <div className="absolute inset-0">
          <img src="/hero-bg.jpg" alt="Farming Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center z-10 w-full">
          {/* Animated Texts */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl animate-fade-in-up">
            KOSHI AMRIT <br className="hidden sm:block" />
            <span className="text-brand-accent">{t.heroTitle2}</span>
          </h1>
          <p className="text-xl sm:text-3xl mb-4 font-semibold text-gray-100 drop-shadow-xl animate-fade-in-up delay-100">
            {t.heroSubtitle}
          </p>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl mb-12 text-gray-200 drop-shadow-md animate-fade-in-up delay-200">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in-up delay-300">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-brand-green font-bold text-lg rounded-full shadow-xl hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
            >
              {t.btnRegister}
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white font-bold text-lg rounded-full shadow-xl hover:bg-white hover:text-brand-green hover:scale-105 transition-all duration-300"
            >
              {t.btnLearn}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.aboutTitle}</h2>
            <div className="w-24 h-1 bg-brand-leaf mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-lg text-gray-600 space-y-6 leading-relaxed text-left">
              <p><strong>KOSHI Amrit</strong> - {t.aboutP1}</p>
              <p>{t.aboutP2}</p>
              
              <div className="mt-8 p-6 bg-green-50 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-lg font-bold text-brand-green mb-3 border-b border-green-200 pb-2">{t.companyInfo}</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span className="font-semibold w-32">CIN:</span> U01611BR2026PTC086791</li>
                  <li className="flex gap-2"><span className="font-semibold w-32">Incorporated On:</span> 27/07/2026</li>
                  <li className="flex gap-2"><span className="font-semibold w-32">Registered Office:</span> PIRNAGAR</li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Users className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"पंजीकरण":"Farmer registration" },
                { icon: <Store className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"उपज खरीद":"Produce procurement" },
                { icon: <DollarSign className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"उचित मूल्य":"Competitive pricing" },
                { icon: <Landmark className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"वित्तीय सहायता":"Financial assistance" },
                { icon: <HandHeart className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"सहयोग सेवाएँ":"Support services" },
                { icon: <MapPin className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"बाजार लिंकेज":"Market linkage" },
                { icon: <Sprout className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"किसान विकास":"Farmer development" },
                { icon: <ShieldCheck className="text-brand-leaf w-5 h-5"/>, text: language==='hi'?"अधिकृत सुविधाएँ":"Authorized facilities" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-100 shadow-sm hover:shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-gray-800 font-semibold text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.boardTitle}</h2>
            <div className="w-24 h-1 bg-brand-leaf mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">{t.boardDesc}</p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-brand-green mb-8 text-center bg-green-50 py-3 rounded-lg">Board of Directors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { name: "Saurav Kumar Kanth", role: "Chairman / Director", din: "11851487" },
                { name: "Sawan Kumar Kath", role: "Director", din: "11851490" },
                { name: "Arjun Sharma", role: "Director", din: "11851489" },
                { name: "Antriksh Kumar Verma", role: "Director", din: "11851491" },
                { name: "Nandlal Sharma", role: "Director", din: "11851488" }
              ].map((person, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green">
                    <Users size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{person.name}</h4>
                  <p className="text-brand-leaf font-medium text-sm mb-2">{person.role}</p>
                  <p className="text-xs text-gray-500 bg-gray-50 py-1 rounded">DIN: {person.din}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-brand-green mb-8 text-center bg-green-50 py-3 rounded-lg">Key Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { name: "Pardeep Sharma", role: "Member" },
                { name: "Prashat Kumar Sharma", role: "Member" },
                { name: "Smita Kumari", role: "Member" },
                { name: "Vikram Kumar", role: "Member" },
                { name: "Suraj Kumar", role: "Member" }
              ].map((person, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                    <Users size={24} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{person.name}</h4>
                  <p className="text-gray-500 text-sm font-medium">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.servicesTitle}</h2>
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

      {/* Impact Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#16A34A 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.networkTitle}</h2>
            <div className="w-24 h-1 bg-brand-leaf mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">{t.networkDesc}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { count: `${stats.totalFarmers}+`, label: t.farmersJoined },
              { count: stats.totalArea, label: t.acresLand },
              { count: stats.districts, label: t.districts },
              { count: stats.villages, label: t.villages }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-green-50 rounded-2xl shadow-sm border border-green-100 hover:-translate-y-1 transition-transform">
                <div className="text-3xl sm:text-4xl font-black text-brand-green mb-2">{stat.count}</div>
                <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a href="/network" className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-brand-leaf transition-colors group">
              <Globe className="group-hover:animate-spin" /> {t.viewMap}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.contactTitle}</h2>
            <div className="w-24 h-1 bg-brand-leaf mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{t.contactDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Contact Form */}
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.sendMessage}</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none resize-none" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-lg shadow-md hover:bg-brand-leaf transition-colors text-lg flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Submit
                </button>
              </form>
            </div>
            
            {/* Contact Info & Map */}
            <div className="bg-brand-green text-white p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-8 text-brand-accent">{t.contactInfo}</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full flex-shrink-0">
                      <MapPin size={24} className="text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t.officeAddress}</h4>
                      <p className="text-green-50 leading-relaxed">PIRNAGAR, Bihar, India<br />Pin - 852101</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full flex-shrink-0">
                      <Phone size={24} className="text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t.phone}</h4>
                      <p className="text-green-50">+91 9931655936<br />+91 8407878515</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full flex-shrink-0">
                      <Mail size={24} className="text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t.email}</h4>
                      <p className="text-green-50">info@koshiamrit.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map embedded */}
              <div className="mt-12 rounded-xl overflow-hidden h-48 bg-white/10 border border-white/20 relative">
                <iframe
                  title="Office Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Thakurbari+Shiv+Mandir,+Pirnagar,+Bihar&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
