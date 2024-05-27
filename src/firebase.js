// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlH--0F-ARWZDH1Sd3U04jNJbHEcfT2kA",
  authDomain: "financely--expense-tracker.firebaseapp.com",
  projectId: "financely--expense-tracker",
  storageBucket: "financely--expense-tracker.appspot.com",
  messagingSenderId: "929886161612",
  appId: "1:929886161612:web:215322a3531a75b12bd069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };