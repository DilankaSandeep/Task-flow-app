// Import the functions you need from the SDKs you need
// @ts-ignore
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzmvHdnpCJDH9HHxQF8IOvjt_0uJIDOog",
    authDomain: "taskflow-app-2d67e.firebaseapp.com",
    projectId: "taskflow-app-2d67e",
    storageBucket: "taskflow-app-2d67e.appspot.com",
    messagingSenderId: "771295182704",
    appId: "1:771295182704:web:b423121ced7856f174d9b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {auth, app};
