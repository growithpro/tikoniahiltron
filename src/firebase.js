// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDaxF-tqyZXI7Ee5EE5CgqfuMokwjKQqVs",
  authDomain: "itda-app-99c7e.firebaseapp.com",
  projectId: "itda-app-99c7e",
  storageBucket: "itda-app-99c7e.firebasestorage.app",
  messagingSenderId: "196531501827",
  appId: "1:196531501827:web:951f05a38a330b20da0736",
  measurementId: "G-6X37N3WNE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
