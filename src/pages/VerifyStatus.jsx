import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, User, MapPin } from 'lucide-react';
import { getFarmerById } from '../utils/mockStore';

const VerifyStatus = () => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // The id should be formatted correctly, e.g., KAPC-2026-000001
      // Auto-format if user just types the number
      let formattedId = searchId.trim().toUpperCase();
      if (!formattedId.startsWith('KAPC-')) {
        if (!isNaN(formattedId)) {
          formattedId = `KAPC-2026-${String(formattedId).padStart(6, '0')}`;
        }
      }

      const farmerData = await getFarmerById(formattedId);
      
      if (farmerData) {
        setResult(farmerData);
      } else {
        setError('No farmer found with this Registration ID. Please check the ID and try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 pb-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="bg-brand-green px-6 py-10 text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Verify Registration</h1>
            <p className="text-green-100 text-sm">Check the official status of your Farmer ID</p>
          </div>

          <div className="p-6 sm:p-10">
            <form onSubmit={handleSearch} className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Registration ID
              </label>
              <div className="flex gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. KAPC-2026-000001 or just 1"
                    className="pl-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:ring-0 outline-none transition-colors uppercase"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-leaf transition-colors disabled:bg-gray-400 flex items-center gap-2"
                >
                  {loading ? 'Searching...' : 'Verify'}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-xl flex items-start gap-3">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Result Card */}
            {result && (
              <div className="bg-green-50/50 border-2 border-brand-green/20 rounded-2xl p-6 relative overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                
                <div className="flex items-center gap-3 mb-6 border-b border-green-100 pb-4">
                  <div className="bg-green-100 text-brand-green p-2 rounded-full">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Record Verified</h3>
                    <p className="text-xs text-brand-green font-semibold uppercase tracking-wider">Official Data Found</p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Registration ID</p>
                    <p className="font-black text-xl text-brand-green tracking-wide">{result.registration_id}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><User size={12}/> Farmer Name</p>
                      <p className="font-bold text-gray-900">{result.full_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        result.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {result.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><MapPin size={12}/> Location</p>
                    <p className="font-semibold text-gray-800">{result.village}, {result.district}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-green-100 flex justify-between items-center text-xs text-gray-500">
                    <span>Registered on: {new Date(result.created_at).toLocaleDateString()}</span>
                    <span>Valid Record ✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyStatus;
