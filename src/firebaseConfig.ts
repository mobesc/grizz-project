// src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSy...", // Paste your full, secret key here
  authDomain: "grizz-55ef5.firebaseapp.com",
  projectId: "grizz-55ef5",
  storageBucket: "grizz-55ef5.appspot.com",
  messagingSenderId: "31512870611",
  appId: "1:31512870611:web:38bf54e5cddd4b644ee6",
  measurementId: "G-4NLTJ38RDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services your app will use
export const auth = getAuth(app);       // For User Authentication
export const db = getFirestore(app);      // For the Database
export const storage = getStorage(app);   // For Image/File Storage
export default app;