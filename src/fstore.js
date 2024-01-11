// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALG8NPl7ZDke82pBusqH_G8ij0BJwQESw",
  authDomain: "photofolio-78a80.firebaseapp.com",
  projectId: "photofolio-78a80",
  storageBucket: "photofolio-78a80.appspot.com",
  messagingSenderId: "175216585078",
  appId: "1:175216585078:web:48077081c525b80057f257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbs = getFirestore(app);