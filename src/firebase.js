// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXdWEcyc2rO54W09CJaFjSxBCVa7g_Qbw",
  authDomain: "studyvault-170e9.firebaseapp.com",
  projectId: "studyvault-170e9",
  storageBucket: "studyvault-170e9.firebasestorage.app",
  messagingSenderId: "270035683799",
  appId: "1:270035683799:web:90ea9b00212e33201c2392",
  measurementId: "G-N2NP5DTZXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);