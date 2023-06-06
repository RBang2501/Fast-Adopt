// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyCf4JGTnhpEBDkSMwh7JzhWwOsBIcQL3_U",
  authDomain: "balasha-7f14a.firebaseapp.com",
  projectId: "balasha-7f14a",
  storageBucket: "balasha-7f14a.appspot.com",
  messagingSenderId: "478745721023",
  appId: "1:478745721023:web:9ce5e4db474370ca332e0a",
});

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const storage = app.storage();
export const rdb = app.database();
export const db = app.firestore();
