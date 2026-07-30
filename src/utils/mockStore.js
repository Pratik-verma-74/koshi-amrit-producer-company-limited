// Simple localStorage based mock store for demo purposes

const FARMERS_KEY = 'kapc_farmers';
const ADMIN_AUTH_KEY = 'kapc_admin_auth';

export const getFarmers = () => {
  const data = localStorage.getItem(FARMERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFarmer = (farmerData) => {
  const farmers = getFarmers();
  const idCount = farmers.length + 1;
  const registrationId = `KAPC-2026-${String(idCount).padStart(6, '0')}`;
  
  const newFarmer = {
    ...farmerData,
    id: Date.now().toString(),
    registration_id: registrationId,
    created_at: new Date().toISOString(),
    status: 'Pending'
  };
  
  farmers.push(newFarmer);
  localStorage.setItem(FARMERS_KEY, JSON.stringify(farmers));
  
  return newFarmer;
};

export const getFarmerById = (id) => {
  const farmers = getFarmers();
  return farmers.find(f => f.registration_id === id || f.id === id);
};

export const loginAdmin = (username, password) => {
  // Hardcoded mock credentials
  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_AUTH_KEY);
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
};
