// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsK8hgvG5uQ8y5tKdi8KTsdkkhPk93690",
  authDomain: "app-social-connect.firebaseapp.com",
  projectId: "app-social-connect",
  storageBucket: "app-social-connect.appspot.com",
  messagingSenderId: "390232666724",
  appId: "1:390232666724:web:e16f7b21224373c18b2571",
  measurementId: "G-CYF7BL8B1E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);
