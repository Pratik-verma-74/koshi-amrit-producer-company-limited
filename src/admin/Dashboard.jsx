import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getFarmers, isAdminAuthenticated, logoutAdmin } from '../utils/mockStore';
import { Users, LogOut, Search, Filter, Eye, Download, FileSpreadsheet } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin');
      return;
    }
    setFarmers(getFarmers().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  }, [navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin');
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const thisMonthStr = todayStr.substring(0, 7);
  
  const stats = {
    total: farmers.length,
    today: farmers.filter(f => f.created_at.startsWith(todayStr)).length,
    thisMonth: farmers.filter(f => f.created_at.startsWith(thisMonthStr)).length
  };

  const filteredFarmers = farmers.filter(f => {
    const matchesSearch = f.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.registration_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.mobile.includes(searchTerm);
    const matchesDistrict = filterDistrict ? f.district === filterDistrict : true;
    return matchesSearch && matchesDistrict;
  });

  const uniqueDistricts = [...new Set(farmers.map(f => f.district))].filter(Boolean);

  const exportCsv = () => {
    // Simple CSV export
    const headers = ['Registration ID', 'Name', 'Mobile', 'Village', 'District', 'State', 'Status', 'Date'];
    const rows = filteredFarmers.map(f => [
      f.registration_id, f.full_name, f.mobile, f.village, f.district, f.state, f.status, new Date(f.created_at).toLocaleDateString('en-IN')
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "koshi_amrit_farmers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Navbar */}
      <nav className="bg-brand-green text-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded">
            <Users className="w-6 h-6 text-brand-green" />
          </div>
          <span className="font-bold text-lg hidden sm:block">KOSHI AMRIT | Admin Dashboard</span>
          <span className="font-bold text-lg sm:hidden">Admin</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </nav>

      <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Farmers Registered</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="text-gray-500 text-sm font-medium mb-1">Registrations This Month</div>
            <div className="text-3xl font-bold text-brand-leaf">{stats.thisMonth}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="text-gray-500 text-sm font-medium mb-1">Registrations Today</div>
            <div className="text-3xl font-bold text-brand-accent">{stats.today}</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white p-4 rounded-t-xl shadow-sm border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex w-full sm:w-auto gap-4 flex-col sm:flex-row">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search name, ID, mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none text-sm"
              />
            </div>
            
            <div className="relative w-full sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-leaf outline-none text-sm bg-white"
              >
                <option value="">All Districts</option>
                {uniqueDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button 
            onClick={exportCsv}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            <FileSpreadsheet size={16} />
            Export CSV
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Registration ID</th>
                  <th className="px-6 py-4 font-medium">Farmer Name</th>
                  <th className="px-6 py-4 font-medium">Mobile</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredFarmers.length > 0 ? (
                  filteredFarmers.map((farmer) => (
                    <tr key={farmer.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-brand-green">
                        {farmer.registration_id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {farmer.full_name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {farmer.mobile}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {farmer.village}, {farmer.district}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(farmer.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {farmer.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          to={`/admin/farmer/${farmer.id}`}
                          className="inline-flex items-center text-brand-green hover:text-brand-leaf"
                        >
                          <Eye size={18} className="mr-1" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No farmer records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
