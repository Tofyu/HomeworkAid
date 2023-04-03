import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBcxl85I5B_GnjbaRPzYdGGKi84WxM5ma0",
    authDomain: "homeworkaid-1b338.firebaseapp.com",
    projectId: "homeworkaid-1b338",
    storageBucket: "homeworkaid-1b338.appspot.com",
    messagingSenderId: "1010922733288",
    appId: "1:1010922733288:web:f4442097075cb895b0d35d"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
export const auth = firebase.auth();