import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

//Info traida desde la web de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC7eWW3b_TK7mV9lPpOWpBbb5b366YDmOY",
    authDomain: "firestore-auth-mt.firebaseapp.com",
    projectId: "firestore-auth-mt",
    storageBucket: "firestore-auth-mt.appspot.com",
    messagingSenderId: "197680293132",
    appId: "1:197680293132:web:88e49a70a4765491c95529"
  };

//Initialize FireBase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)  
}   

const database = firebase.firestore()
const auth = firebase.auth()
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp //Trae la hora del servidor


//Detectar si hay usuarios autenticados. Todo de Firebase
firebase.getCurrentUser = () =>{
    return new Promise((resolve, reject) => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            unsuscribe()
            resolve(user)
        }, reject)
    })
}

export {database, auth, marcaTiempo, firebase}