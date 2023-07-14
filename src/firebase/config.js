// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Timestamp, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHrI7jzmaUzlIijpw08FAgwxJwoYLACLw",
  authDomain: "project-mgmt-27e71.firebaseapp.com",
  projectId: "project-mgmt-27e71",
  storageBucket: "project-mgmt-27e71.appspot.com",
  messagingSenderId: "1096209793146",
  appId: "1:1096209793146:web:3d2bc668b953236b10fbc3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

const storage = getStorage();

export { db, auth, storage };
