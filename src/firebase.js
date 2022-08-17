// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUssv2RHX8CM_vf8BECDB0PR4mGMXQnuE",
    authDomain: "project3-mugstore.firebaseapp.com",
    projectId: "project3-mugstore",
    storageBucket: "project3-mugstore.appspot.com",
    messagingSenderId: "872821906807",
    appId: "1:872821906807:web:a4b45af0d12dbb2bd8d572"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;