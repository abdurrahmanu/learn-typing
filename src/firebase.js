// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTaIJlc7duXsuCBtlHsHe8jyowMcd8sMQ",
    authDomain: "kiboard0.firebaseapp.com",
    projectId: "kiboard0",
    storageBucket: "kiboard0.firebasestorage.app",
    messagingSenderId: "831328659129",
    appId: "1:831328659129:web:374fda879b6d7928379d68",
    measurementId: "G-9BZ59RCSKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export {app, db}