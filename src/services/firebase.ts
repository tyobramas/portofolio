import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDsti-1UNGkEBHEsdlM2RkfVZmRoIYiqgY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-stats-223c9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-stats-223c9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-stats-223c9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "146483946758",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:146483946758:web:98828ad3066a76e4c8aa87",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GM64KHRL4W"
};

// Initialize Firebase safely (avoid re-initialization in HMR)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
