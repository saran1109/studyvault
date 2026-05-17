import { initializeApp }
from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
}
from "firebase/auth";

import {
  getFirestore
}
from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDXdWEcyc2rO54W09CJaFjSxBCVa7g_Qbw",

  authDomain:
    "studyvault-170e9.firebaseapp.com",

  projectId:
    "studyvault-170e9",

  storageBucket:
    "studyvault-170e9.appspot.com",

  messagingSenderId:
    "270035683799",

  appId:
    "1:270035683799:web:90ea9b00212e33201c2392"

};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const db =
  getFirestore(app);

export default app;