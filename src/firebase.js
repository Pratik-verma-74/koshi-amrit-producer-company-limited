import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhaN1QuiGh32xwIY6tysjH7Sv4M9_fJxk",
  authDomain: "koshiamrit-krishi-producer.firebaseapp.com",
  projectId: "koshiamrit-krishi-producer",
  storageBucket: "koshiamrit-krishi-producer.firebasestorage.app",
  messagingSenderId: "71304926816",
  appId: "1:71304926816:web:b3585591ddfee94cd09505",
  measurementId: "G-S968ZD7K90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { db, analytics };
