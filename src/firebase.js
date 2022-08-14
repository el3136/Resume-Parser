// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "resume-parser-a09e6.firebaseapp.com",
  projectId: "resume-parser-a09e6",
  storageBucket: "resume-parser-a09e6.appspot.com",
  messagingSenderId: "767115674213",
  appId: "1:767115674213:web:89de53a53c2764a17e3c8c",
  measurementId: "G-778TTDR489"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app); 

export const resumesCollection = collection(db, "resumes")

export const userIdCollection = collection(db, "user_types")

// auth.currentUser.displayName, auth.currentUser.uid
// Google Authentication
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();




