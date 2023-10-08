// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOlGiYdXL7m9fDB1k3M0Zz12mVojk68sU",
  authDomain: "student-management-syste-93177.firebaseapp.com",
  projectId: "student-management-syste-93177",
  storageBucket: "student-management-syste-93177.appspot.com",
  messagingSenderId: "1010423082682",
  appId: "1:1010423082682:web:283c8bfb8b63d8cf811c83",
  measurementId: "G-TL4BQ07MBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app)