import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveFarmer } from '../utils/mockStore';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    full_name: '',
    father_husband_name: '',
    mobile: '',
    alternate_mobile: '',
    dob: '',
    gender: '',
    // Address
    village: '',
    panchayat: '',
    block: '',
    district: '',
    state: 'Bihar',
    pin_code: '',
    // Farming
    land_area: '',
    land_unit: 'Acre',
    main_crops: '',
    irrigation: 'Yes',
    farming_type: 'Organic',
    // Consent
    consent: false,
    aadhaar_number: '' // Optional
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.full_name.trim()) newErrors.full_name = 'Name is required';
      if (!formData.father_husband_name.trim()) newErrors.father_husband_name = "Father/Husband's Name is required";
      if (!formData.mobile.trim() || formData.mobile.length !== 10) newErrors.mobile = 'Valid 10-digit mobile number is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if (step === 2) {
      if (!formData.village.trim()) newErrors.village = 'Village is required';
      if (!formData.panchayat.trim()) newErrors.panchayat = 'Panchayat is required';
      if (!formData.block.trim()) newErrors.block = 'Block is required';
      if (!formData.district.trim()) newErrors.district = 'District is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.pin_code.trim() || formData.pin_code.length !== 6) newErrors.pin_code = 'Valid 6-digit PIN code is required';
    } else if (step === 3) {
      if (!formData.land_area.trim()) newErrors.land_area = 'Land Area is required';
      if (!formData.main_crops.trim()) newErrors.main_crops = 'Main crops are required';
    } else if (step === 4) {
      if (!formData.consent) newErrors.consent = 'You must provide consent to register';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      const savedFarmer = saveFarmer(formData);
      
      const whatsappNumber = "918407878515";
      const message = `*New Farmer Registration*\n\n` +
        `*ID:* ${savedFarmer.registration_id}\n` +
        `*Name:* ${savedFarmer.full_name}\n` +
        `*Mobile:* ${savedFarmer.mobile}\n` +
        `*Address:* ${savedFarmer.village}, ${savedFarmer.district}\n` +
        `*Farming:* ${savedFarmer.land_area} ${savedFarmer.land_unit} (${savedFarmer.main_crops})\n\n` +
        `_Registered via KOSHI AMRIT Portal_`;
        
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      navigate('/success', { state: { farmer: savedFarmer } });
    }
  };

  const steps = [
    { id: 1, name: 'Personal' },
    { id: 2, name: 'Address' },
    { id: 3, name: 'Farming' },
    { id: 4, name: 'Submit' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-brand-green px-6 py-8 text-center text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Farmer Registration</h1>
            <p className="text-green-100">Join Koshi Amrit Producer Company Limited</p>
          </div>

          {/* Progress Indicator */}
          <div className="px-6 pt-8 pb-4">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-leaf transition-all duration-300 z-0"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              
              {steps.map((s) => (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                    step >= s.id ? 'bg-brand-leaf border-brand-leaf text-white' : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden sm:block ${
                    step >= s.id ? 'text-brand-green' : 'text-gray-400'
                  }`}>{s.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:hidden text-center text-sm font-medium text-brand-green">
              Step {step} of 4: {steps[step-1].name}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6 animation-fade-in">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter full name"
                      />
                      {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Father's/Husband's Name *</label>
                      <input
                        type="text"
                        name="father_husband_name"
                        value={formData.father_husband_name}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.father_husband_name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter relative's name"
                      />
                      {errors.father_husband_name && <p className="text-red-500 text-xs mt-1">{errors.father_husband_name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobile"
                        maxLength="10"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="10-digit number"
                      />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Mobile (Optional)</label>
                      <input
                        type="tel"
                        name="alternate_mobile"
                        maxLength="10"
                        value={formData.alternate_mobile}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow bg-white ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (Optional)</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Address Information */}
              {step === 2 && (
                <div className="space-y-6 animation-fade-in">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Address Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow bg-white"
                      >
                        <option value="Bihar">Bihar</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter District"
                      />
                      {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Block *</label>
                      <input
                        type="text"
                        name="block"
                        value={formData.block}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.block ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter Block"
                      />
                      {errors.block && <p className="text-red-500 text-xs mt-1">{errors.block}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Panchayat *</label>
                      <input
                        type="text"
                        name="panchayat"
                        value={formData.panchayat}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.panchayat ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter Panchayat"
                      />
                      {errors.panchayat && <p className="text-red-500 text-xs mt-1">{errors.panchayat}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Village *</label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.village ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter Village"
                      />
                      {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                      <input
                        type="text"
                        name="pin_code"
                        maxLength="6"
                        value={formData.pin_code}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.pin_code ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="6-digit PIN"
                      />
                      {errors.pin_code && <p className="text-red-500 text-xs mt-1">{errors.pin_code}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Farming Information */}
              {step === 3 && (
                <div className="space-y-6 animation-fade-in">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Farming Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Land Area *</label>
                      <div className="flex">
                        <input
                          type="number"
                          name="land_area"
                          value={formData.land_area}
                          onChange={handleInputChange}
                          className={`w-2/3 p-3 border border-r-0 rounded-l-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.land_area ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="e.g. 5"
                        />
                        <select
                          name="land_unit"
                          value={formData.land_unit}
                          onChange={handleInputChange}
                          className="w-1/3 p-3 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-2 focus:ring-brand-leaf outline-none"
                        >
                          <option value="Acre">Acre</option>
                          <option value="Hectare">Hectare</option>
                          <option value="Bigha">Bigha</option>
                        </select>
                      </div>
                      {errors.land_area && <p className="text-red-500 text-xs mt-1">{errors.land_area}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Main Crops *</label>
                      <input
                        type="text"
                        name="main_crops"
                        value={formData.main_crops}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow ${errors.main_crops ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g. Wheat, Rice, Maize"
                      />
                      {errors.main_crops && <p className="text-red-500 text-xs mt-1">{errors.main_crops}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation Availability *</label>
                      <select
                        name="irrigation"
                        value={formData.irrigation}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow bg-white"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Partial">Partial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farming Type *</label>
                      <select
                        name="farming_type"
                        value={formData.farming_type}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow bg-white"
                      >
                        <option value="Organic">Organic</option>
                        <option value="Conventional">Conventional</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number (Optional)</label>
                      <input
                        type="text"
                        name="aadhaar_number"
                        maxLength="12"
                        value={formData.aadhaar_number}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none transition-shadow"
                        placeholder="12-digit Aadhaar Number"
                      />
                      <p className="text-xs text-gray-500 mt-1">Provide only if you want to avail specific government linked benefits.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Submit */}
              {step === 4 && (
                <div className="space-y-6 animation-fade-in">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Review & Submit</h2>
                  
                  <div className="bg-green-50 p-6 rounded-lg space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 block">Name</span>
                        <span className="font-bold text-gray-900">{formData.full_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Mobile</span>
                        <span className="font-bold text-gray-900">{formData.mobile}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Address</span>
                        <span className="font-bold text-gray-900">{formData.village}, {formData.district}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Farming</span>
                        <span className="font-bold text-gray-900">{formData.land_area} {formData.land_unit} ({formData.main_crops})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-brand-leaf border-gray-300 rounded focus:ring-brand-leaf accent-brand-leaf"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        I confirm that the information provided by me is correct and I consent to KOSHI AMRIT PRODUCER COMPANY LIMITED using my information for farmer registration and related services. I have read the <a href="#" className="text-brand-leaf underline">Privacy Policy</a>.
                      </span>
                    </label>
                    {errors.consent && <p className="text-red-500 text-sm mt-2 ml-8 font-medium">{errors.consent}</p>}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={18} className="mr-1" />
                    Back
                  </button>
                ) : <div></div>}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brand-green hover:bg-brand-leaf transition-colors"
                  >
                    Next
                    <ChevronRight size={18} className="ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-sm font-bold text-brand-green bg-brand-accent hover:bg-yellow-400 transition-colors"
                  >
                    <CheckCircle2 size={18} className="mr-2" />
                    Submit Registration
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
