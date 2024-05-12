// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAEk-7JYdX1bae3g4yEJ3wZBKDgcGVN7Q",
  authDomain: "e-commerce-app-e8403.firebaseapp.com",
  projectId: "e-commerce-app-e8403",
  storageBucket: "e-commerce-app-e8403.appspot.com",
  messagingSenderId: "1066597495093",
  appId: "1:1066597495093:web:faa67e0f8fea01523c1c7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db}