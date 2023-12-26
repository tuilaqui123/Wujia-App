// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDE4IdMDpT8bhnpCvnXZhkiMxMdgAMtJro",
    authDomain: "ie307---store.firebaseapp.com",
    databaseURL: "https://ie307---store-default-rtdb.firebaseio.com",
    projectId: "ie307---store",
    storageBucket: "ie307---store.appspot.com",
    messagingSenderId: "29017067198",
    appId: "1:29017067198:web:8e10b66e7ce32284b098ef",
    measurementId: "G-33PBP8QHVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);