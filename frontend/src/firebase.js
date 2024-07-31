import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHELQR0K6hqt6BnWr1ZmznpO8Q7aNzCe4",
  authDomain: "socialvista-a2ac3.firebaseapp.com",
  projectId: "socialvista-a2ac3",
  storageBucket: "socialvista-a2ac3.appspot.com",
  messagingSenderId: "696872662032",
  appId: "1:696872662032:web:e80d4ea1fd53636ffb8695",
  measurementId: "G-24BX2675BV",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
