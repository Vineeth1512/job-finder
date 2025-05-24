import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKmi8CgtygdGu9uQgUGnU-sGF7Im2I7LE",
  authDomain: "job-finder-65da0.firebaseapp.com",
  projectId: "job-finder-65da0",
  storageBucket: "job-finder-65da0.firebasestorage.app",
  messagingSenderId: "235926441122",
  appId: "1:235926441122:web:7f5401d8c8b3eb2ac39bfb",
  measurementId: "G-2B17R96KKY"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
