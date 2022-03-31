// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSfULDQvQypi3kbriwLkeeRnTh6rNelkQ",
    authDomain: "sahila-app.firebaseapp.com",
    projectId: "sahila-app",
    storageBucket: "sahila-app.appspot.com",
    messagingSenderId: "141339435799",
    appId: "1:141339435799:web:69f48f203025c52e708d52",
    measurementId: "G-LDK9ZEG7EV"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

