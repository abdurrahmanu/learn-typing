import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA6Ra5nEzchrSgmlzUY6SV6UMpA9fdrJD8",
    authDomain: "typing-4ffd8.firebaseapp.com",
    projectId: "typing-4ffd8",
    storageBucket: "typing-4ffd8.appspot.com",
    messagingSenderId: "493398167162",
    appId: "1:493398167162:web:d404a2c5395e58da21f5c3",
    measurementId: "G-0J9XS7RXN8"
    };

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);