// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps",
  authDomain: "kurdhomes.firebaseapp.com",
  projectId: "kurdhomes",
  storageBucket: "kurdhomes.appspot.com",
  messagingSenderId: "1036759382952",
  appId: "1:1036759382952:web:2a314aa053c4745d25bb9d",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
