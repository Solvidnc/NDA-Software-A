// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB3q_g3Z8reLVbefrtuimQL6HqEzQqvkw",
  authDomain: "nda-project-d10eb.firebaseapp.com",
  databaseURL: "https://nda-project-d10eb-default-rtdb.firebaseio.com",
  projectId: "nda-project-d10eb",
  storageBucket: "nda-project-d10eb.firebasestorage.app",
  messagingSenderId: "430405152507",
  appId: "1:430405152507:web:7736b1fc53e37ec72fca5e",
  measurementId: "G-2J49WESL29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getDatabase(app);

export {db,app};
