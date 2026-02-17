import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbODQuKHsPXC3ZDhGrXxFhKqyX8ciEHQI",
  authDomain: "vehicle-264ef.firebaseapp.com",
  projectId: "vehicle-264ef",
  storageBucket: "vehicle-264ef.firebasestorage.app",
  messagingSenderId: "138358080107",
  appId: "1:138358080107:web:891d23879d25fdeb97a72e",
  measurementId: "G-T2PDZNMSG4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);