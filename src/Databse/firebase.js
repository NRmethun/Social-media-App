

import firebase from "firebase" ;
const firebaseApp =firebase.initializeApp({
  
        apiKey: "AIzaSyBTuCvNh6cjvr-DcRH9FY4dwM0vgYTiBVU",
        authDomain: "instra-clone-react.firebaseapp.com",
        projectId: "instra-clone-react",
        storageBucket: "instra-clone-react.appspot.com",
        messagingSenderId: "998572376483",
        appId: "1:998572376483:web:0569b5522a8847426e9a16"
    
}) ; 

const db= firebaseApp.firestore() ;
const auth = firebase.auth() ;
const storage = firebase.storage() ;

export {db,auth,storage} ;