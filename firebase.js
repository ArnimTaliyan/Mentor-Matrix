import { getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app';
import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwu3H0Xsktux9AQuhrwpx-2u5dZiwA-8k",
  authDomain: "mentor-matrix-4204b.firebaseapp.com",
  databaseURL: "https://mentor-matrix-4204b-default-rtdb.firebaseio.com",
  projectId: "mentor-matrix-4204b",
  storageBucket: "mentor-matrix-4204b.appspot.com",
  messagingSenderId: "1072171754165",
  appId: "1:1072171754165:web:20071f758a1064031294fc"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase();



  export {db} 
  export{storage}