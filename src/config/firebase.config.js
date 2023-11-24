// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgqHTctKXjfWacLHrOXHY-kzo23t4a8tc",
  authDomain: "mcms-b8a12.firebaseapp.com",
  projectId: "mcms-b8a12",
  storageBucket: "mcms-b8a12.appspot.com",
  messagingSenderId: "60941187748",
  appId: "1:60941187748:web:eb63be94eb102b4a880431"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;