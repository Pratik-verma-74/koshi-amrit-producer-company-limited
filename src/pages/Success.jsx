import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Download, Printer, Home, User } from 'lucide-react';
import html2canvas from 'html2canvas';

const Success = () => {
  const location = useLocation();
  const farmer = location.state?.farmer;

  if (!farmer) {
    return <Navigate to="/" />;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPVC = async () => {
    const cardElement = document.getElementById('farmer-id-card');
    if (!cardElement) return;
    
    try {
      const canvas = await html2canvas(cardElement, {
        scale: 3, // High resolution for printing
        useCORS: true,
        backgroundColor: null
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${farmer.registration_id}_PVC_Card.png`;
      link.click();
    } catch (err) {
      console.error('Error generating PVC card image:', err);
      alert('Failed to generate image. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center p-8">
        <div className="flex justify-center mb-6 print:hidden">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-brand-green" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2 print:hidden">Registration Successful!</h2>
        <p className="text-gray-600 mb-8 print:hidden">
          Thank you for registering with KOSHI AMRIT PRODUCER COMPANY LIMITED.
        </p>

        {/* Advanced Farmer ID Card */}
        <div id="farmer-id-card" className="bg-white rounded-xl mb-8 text-left shadow-2xl relative overflow-hidden border border-gray-300">
          
          {/* Header */}
          <div className="bg-brand-green p-4 flex justify-between items-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white p-1 rounded shadow-sm">
                <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white tracking-wide leading-tight">KOSHI AMRIT</h3>
                <p className="text-[9px] text-green-200 uppercase font-semibold tracking-widest">Producer Company Limited</p>
              </div>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded text-white text-[10px] font-bold border border-white/30 backdrop-blur-sm z-10">
              FARMER ID
            </div>
          </div>
          
          {/* Body */}
          <div className="p-5 flex gap-4 relative">
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <img src="/logo.png" alt="watermark" className="h-40 w-auto grayscale" />
            </div>

            {/* Photo Placeholder */}
            <div className="flex flex-col items-center gap-2 z-10 w-24 flex-shrink-0">
              <div className="w-20 h-24 bg-gray-100 border border-gray-300 rounded overflow-hidden flex items-center justify-center text-gray-400 shadow-inner">
                <User size={40} strokeWidth={1.5} />
              </div>
              <div className="bg-brand-accent text-brand-green text-[10px] font-bold px-2 py-1 rounded w-full text-center shadow-sm">
                AUTHORIZED
              </div>
            </div>
            
            {/* Details */}
            <div className="flex-grow space-y-3 z-10">
              <div className="border-b border-gray-100 pb-2 flex justify-between items-start">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Registration No.</p>
                  <p className="text-lg font-black text-brand-green tracking-widest">{farmer.registration_id}</p>
                </div>
                {/* QR Code placeholder removed as requested for later */}
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                <div className="col-span-2">
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Farmer Name</p>
                  <p className="font-bold text-gray-900 text-sm leading-tight">{farmer.full_name}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Mobile</p>
                  <p className="font-semibold text-xs text-gray-800">{farmer.mobile}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">DOB / Gender</p>
                  <p className="font-semibold text-xs text-gray-800">
                    {farmer.dob ? new Date(farmer.dob).getFullYear() : 'XX'} / {farmer.gender?.charAt(0) || 'X'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Address</p>
                  <p className="font-semibold text-xs text-gray-800 leading-snug">
                    {farmer.village}, {farmer.block},<br />
                    {farmer.district}, {farmer.state} - {farmer.pin_code}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-green-50 px-5 py-2.5 border-t border-green-100 flex justify-between items-end">
            <div className="text-[9px] text-gray-600 font-medium">
              <p>Issued: <span className="text-gray-900">{new Date(farmer.created_at).toLocaleDateString('en-IN')}</span></p>
              <p>Valid till: <span className="text-gray-900">{new Date(new Date(farmer.created_at).setFullYear(new Date(farmer.created_at).getFullYear() + 3)).toLocaleDateString('en-IN')}</span></p>
            </div>
            <div className="text-center flex flex-col items-center">
              {/* Fake signature font */}
              <div className="font-serif italic text-brand-green text-sm leading-none mb-1 -rotate-6">Koshi Amrit Auth</div>
              <p className="border-t border-gray-400 pt-0.5 text-[8px] uppercase tracking-wider text-gray-500 w-24">Auth. Signatory</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 print:hidden">
          <button 
            onClick={handleDownloadPVC}
            className="w-full flex justify-center items-center px-4 py-3 border-2 border-brand-green bg-brand-green text-white rounded-lg font-bold hover:bg-brand-leaf transition-colors"
          >
            <Download className="mr-2" size={18} />
            Download PVC Card Image
          </button>
          
          <button 
            onClick={handlePrint}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors"
          >
            <Printer className="mr-2" size={18} />
            Print
          </button>
          
          <Link 
            to="/"
            className="w-full flex justify-center items-center px-4 py-3 bg-brand-green rounded-lg text-white font-bold hover:bg-brand-leaf transition-colors mt-4"
          >
            <Home className="mr-2" size={18} />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
