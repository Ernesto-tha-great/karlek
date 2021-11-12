// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth }from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGGjGaT3YCbOoZBjDYWSiSyF3Wl-GuEjQ",
  authDomain: "karlek-bc00c.firebaseapp.com",
  projectId: "karlek-bc00c",
  storageBucket: "karlek-bc00c.appspot.com",
  messagingSenderId: "18962783514",
  appId: "1:18962783514:web:fa7cd361c2c28b344160a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };