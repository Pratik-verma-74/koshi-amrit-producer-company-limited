import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

const ADMIN_AUTH_KEY = 'kapc_admin_auth';
const COLLECTION_NAME = "farmers";

export const getFarmers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const farmers = [];
    querySnapshot.forEach((doc) => {
      farmers.push({ id: doc.id, ...doc.data() });
    });
    return farmers;
  } catch (error) {
    console.error("Error fetching farmers:", error);
    return [];
  }
};

export const saveFarmer = async (farmerData) => {
  try {
    // To keep registration_id sequential, we get current count
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const idCount = querySnapshot.size + 1;
    const registrationId = `KAPC-2026-${String(idCount).padStart(6, '0')}`;
    
    const newFarmer = {
      ...farmerData,
      registration_id: registrationId,
      created_at: new Date().toISOString(),
      status: 'Pending'
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), newFarmer);
    return { id: docRef.id, ...newFarmer };
  } catch (error) {
    console.error("Error saving farmer:", error);
    throw error;
  }
};

export const getFarmerById = async (id) => {
  try {
    const farmersRef = collection(db, COLLECTION_NAME);
    const q = query(farmersRef, where("registration_id", "==", id));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0];
      return { id: docData.id, ...docData.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching farmer by ID:", error);
    return null;
  }
};

export const loginAdmin = (username, password) => {
  // Hardcoded credentials for now
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
