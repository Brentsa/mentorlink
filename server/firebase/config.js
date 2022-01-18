require('dotenv').config();

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
const {initializeApp} = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//import { getStorage, ref } from "firebase/storage";
const {getStorage, ref} = require('firebase/storage');

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
const imagesRef = ref(storage, "images");

module.exports = storage;