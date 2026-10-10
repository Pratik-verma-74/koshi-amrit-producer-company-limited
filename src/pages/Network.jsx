import React, { useState, useEffect } from 'react';
import { Users, MapPin, Wheat, Sprout, Tractor, LineChart, Globe } from 'lucide-react';
import { getFarmers } from '../utils/mockStore';

const Network = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFarmers();
      setFarmers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Calculate dynamic stats
  const totalFarmers = farmers.length;
  
  const totalArea = farmers.reduce((sum, f) => {
    const area = parseFloat(f.land_area) || 0;
    return sum + area;
  }, 0).toFixed(0);

  const districtsMap = new Set();
  const villagesMap = new Set();
  const districtCounts = {};

  farmers.forEach(f => {
    if (f.district) {
      const dist = f.district.trim();
      // Capitalize first letter for neatness
      const formattedDist = dist.charAt(0).toUpperCase() + dist.slice(1).toLowerCase();
      districtsMap.add(formattedDist);
      districtCounts[formattedDist] = (districtCounts[formattedDist] || 0) + 1;
    }
    if (f.village) villagesMap.add(f.village.trim().toLowerCase());
  });

  const districts = districtsMap.size;
  const villages = villagesMap.size;

  // Process Crop Data
  const cropCounts = {};
  let totalCropsCount = 0;
  
  farmers.forEach(f => {
    if (f.main_crops) {
       const crops = f.main_crops.split(',').map(c => c.trim());
       crops.forEach(c => {
         if(c) {
           const cropName = c.charAt(0).toUpperCase() + c.slice(1).toLowerCase();
           cropCounts[cropName] = (cropCounts[cropName] || 0) + 1;
           totalCropsCount++;
         }
       });
    }
  });

  // Sort crops by count
  const sortedCrops = Object.entries(cropCounts).sort((a, b) => b[1] - a[1]);
  
  const colors = ['bg-yellow-400', 'bg-amber-600', 'bg-green-500', 'bg-brand-leaf'];
  let cropData = [];
  
  if (sortedCrops.length > 0) {
    let topCrops = sortedCrops.slice(0, 3);
    let othersCount = sortedCrops.slice(3).reduce((sum, item) => sum + item[1], 0);
    
    topCrops.forEach((item, index) => {
      cropData.push({
        name: item[0],
        percentage: Math.round((item[1] / totalCropsCount) * 100),
        color: colors[index]
      });
    });
    
    if (othersCount > 0) {
      cropData.push({
        name: 'Others',
        percentage: Math.round((othersCount / totalCropsCount) * 100),
        color: colors[3]
      });
    }
  } else {
    cropData = [
      { name: 'Awaiting Data', percentage: 100, color: 'bg-gray-300' }
    ];
  }

  // Yearly Data
  const yearCounts = {};
  farmers.forEach(f => {
    if (f.created_at) {
      const year = new Date(f.created_at).getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });

  // Calculate cumulative counts for years
  const sortedYears = Object.keys(yearCounts).sort();
  const yearlyData = [];
  let cumulative = 0;
  
  sortedYears.forEach(year => {
    cumulative += yearCounts[year];
    yearlyData.push({
      year: year,
      count: cumulative
    });
  });

  // Default if empty
  if (yearlyData.length === 0) {
    yearlyData.push({ year: new Date().getFullYear().toString(), count: 0 });
  }

  const maxYearCount = Math.max(...yearlyData.map(d => d.count), 1); // Avoid div by zero

  // Prepare Top Districts for Map
  const topDistricts = Object.entries(districtCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const mapPositions = [
    "top-1/4 left-1/4",
    "bottom-1/3 right-1/4",
    "top-1/3 right-1/3"
  ];
  
  const mapColors = ["bg-brand-green", "bg-brand-leaf", "bg-amber-500"];
  const mapBorderColors = ["border-brand-green", "border-brand-leaf", "border-amber-500"];

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-20">
      
      {/* Header Section */}
      <div className="bg-brand-green text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Globe size={400} className="text-white -mr-20 -mt-20 animate-[spin_60s_linear_infinite]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Growing Network</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            See how KOSHIAMRIT KRISHI is expanding across India, empowering farmers block by block, village by village.
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-1">{totalFarmers}</h2>
            <p className="text-gray-500 font-medium text-sm">Registered Farmers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
              <MapPin size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-1">{totalArea}</h2>
            <p className="text-gray-500 font-medium text-sm">Acres of Land</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Globe size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-1">{districts}</h2>
            <p className="text-gray-500 font-medium text-sm">Districts Covered</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Tractor size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-1">{villages}</h2>
            <p className="text-gray-500 font-medium text-sm">Active Villages</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Map Visualization (CSS Based) */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-brand-green mb-6 flex items-center gap-2">
              <MapPin /> Area Coverage Map
            </h3>
            <div className="relative w-full h-[400px] bg-blue-50 rounded-2xl overflow-hidden flex items-center justify-center border border-blue-100">
               {/* Abstract Map Representation */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4ADE80 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
               <div className="relative z-10 w-64 h-64 bg-brand-green/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-48 h-48 bg-brand-green/40 rounded-full flex items-center justify-center">
                     <div className="w-32 h-32 bg-brand-green/60 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(22,163,74,0.5)]">
                        <MapPin className="text-white w-12 h-12 drop-shadow-md" />
                     </div>
                  </div>
               </div>
               
               {/* Nodes dynamically positioned */}
               {topDistricts.map((dist, idx) => (
                 <div key={dist[0]} className={`absolute ${mapPositions[idx % mapPositions.length]} bg-white p-2 rounded-lg shadow-md text-xs font-bold text-gray-700 flex items-center gap-1 border-l-4 ${mapBorderColors[idx % mapBorderColors.length]}`}>
                   <span className={`w-2 h-2 rounded-full ${mapColors[idx % mapColors.length]}`}></span> 
                   {dist[0]} ({dist[1]})
                 </div>
               ))}
               {topDistricts.length === 0 && (
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-bold text-gray-500">
                   Waiting for Registrations
                 </div>
               )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Real-time expanding footprint based on official registrations.</p>
          </div>

          <div className="space-y-8">
            {/* Crop Distribution */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-brand-green mb-6 flex items-center gap-2">
                <Wheat /> Major Crops Cultivated
              </h3>
              <div className="space-y-5">
                {cropData.map((crop, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-medium mb-1">
                      <span className="text-gray-700">{crop.name}</span>
                      <span className="text-gray-900 font-bold">{crop.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className={`${crop.color} h-3 rounded-full transition-all duration-1000`} style={{ width: `${crop.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Year over Year Growth */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden">
              <h3 className="text-2xl font-bold text-brand-green mb-8 flex items-center gap-2">
                <LineChart /> Year-by-Year Growth
              </h3>
              <div className="flex items-end justify-around h-64 pt-4 border-b-2 border-l-2 border-gray-200 pb-2 pl-2">
                {yearlyData.map((data, index) => {
                  const heightPercent = Math.max((data.count / maxYearCount) * 100, 10); // min 10% height
                  return (
                    <div key={index} className="flex flex-col items-center group w-full px-2">
                      <div className="text-brand-green font-bold text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 text-center">
                        {data.count} Farmers
                      </div>
                      <div 
                        className="w-full max-w-[4rem] sm:max-w-[5rem] bg-gradient-to-t from-brand-green to-brand-leaf rounded-t-lg transition-all duration-500 hover:opacity-80 relative shadow-md"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <div className="absolute top-0 w-full h-2 bg-white/20 rounded-t-lg"></div>
                      </div>
                      <span className="mt-4 font-bold text-gray-600">{data.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
