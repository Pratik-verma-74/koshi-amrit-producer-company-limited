import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFarmerById, isAdminAuthenticated, logoutAdmin } from '../utils/mockStore';
import { ArrowLeft, Printer, Download, LogOut, User, MapPin, Tractor, Phone, Calendar } from 'lucide-react';

const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin');
      return;
    }
    const fetchFarmer = async () => {
      const foundFarmer = await getFarmerById(id);
      if (foundFarmer) {
        setFarmer(foundFarmer);
      }
    };
    fetchFarmer();
  }, [id, navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!farmer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading farmer details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Navbar */}
      <nav className="bg-brand-green text-white shadow-md px-6 py-4 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="font-bold text-lg">Farmer Details</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </nav>

      <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        
        {/* Actions bar */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{farmer.full_name}</h1>
            <p className="text-gray-500">ID: {farmer.registration_id}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              <Printer size={16} />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-green hover:bg-brand-leaf text-white rounded-lg text-sm font-medium transition-colors">
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print:border-none print:shadow-none">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Registration Profile</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {farmer.status || 'Pending'}
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              
              {/* Personal Section */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-brand-green border-b pb-2">
                  <User size={18} />
                  <h4 className="font-semibold text-lg">Personal Information</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{farmer.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Father's/Husband's Name</p>
                    <p className="font-medium text-gray-900">{farmer.father_husband_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-gray-900">{farmer.gender}</p>
                  </div>
                  {farmer.dob && (
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium text-gray-900">{farmer.dob}</p>
                    </div>
                  )}
                  {farmer.aadhaar_number && (
                    <div>
                      <p className="text-sm text-gray-500">Aadhaar Number (Last 4)</p>
                      <p className="font-medium text-gray-900">********{farmer.aadhaar_number.slice(-4)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-brand-green border-b pb-2">
                  <Phone size={18} />
                  <h4 className="font-semibold text-lg">Contact Details</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium text-gray-900">{farmer.mobile}</p>
                  </div>
                  {farmer.alternate_mobile && (
                    <div>
                      <p className="text-sm text-gray-500">Alternate Mobile</p>
                      <p className="font-medium text-gray-900">{farmer.alternate_mobile}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-4 text-brand-green border-b pb-2 mt-8">
                  <MapPin size={18} />
                  <h4 className="font-semibold text-lg">Address</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Village, Panchayat</p>
                    <p className="font-medium text-gray-900">{farmer.village}, {farmer.panchayat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Block, District</p>
                    <p className="font-medium text-gray-900">{farmer.block}, {farmer.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">State, PIN Code</p>
                    <p className="font-medium text-gray-900">{farmer.state} - {farmer.pin_code}</p>
                  </div>
                </div>
              </div>

              {/* Farming Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4 text-brand-green border-b pb-2">
                  <Tractor size={18} />
                  <h4 className="font-semibold text-lg">Farming Information</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Land</p>
                    <p className="font-medium text-gray-900">{farmer.land_area} {farmer.land_unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Main Crops</p>
                    <p className="font-medium text-gray-900">{farmer.main_crops}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Irrigation</p>
                    <p className="font-medium text-gray-900">{farmer.irrigation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Farming Type</p>
                    <p className="font-medium text-gray-900">{farmer.farming_type}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-sm text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> Registered on: {new Date(farmer.created_at).toLocaleString('en-IN')}
            </span>
            <span>Consent Provided: Yes</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerDetails;
