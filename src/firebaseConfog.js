import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbV1bdv5PJ5PhYJrVi8tJbYBw8jEhzJAs",
    authDomain: "lumioni-b075f.firebaseapp.com",
    projectId: "lumioni-b075f",
    storageBucket: "lumioni-b075f.appspot.com",
    messagingSenderId: "1032758165047",
    appId: "1:1032758165047:web:95d0cc748a0e16b23209b2"
  };
  firebase.initializeApp(firebaseConfig);
// two things my app is using firebase for are authentication of users and database
  export const auth =firebase.auth();
  export const db = firebase.firestore()


