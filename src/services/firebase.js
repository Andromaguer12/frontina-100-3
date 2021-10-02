import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

export const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBom7uiiOEFPhQ2KdHnXTi3_2-jw1pl0og",
    authDomain: "frontina-100-3.firebaseapp.com",
    projectId: "frontina-100-3",
    storageBucket: "frontina-100-3.appspot.com",
    messagingSenderId: "777115812153",
    appId: "1:777115812153:web:91e166674a8f76616468e8"
  });
            
export const auth = firebase.auth();

export const storage = firebase.storage();

export const rdb = firebase.database();


let db = firebase.firestore();


db.settings({timestampsInSnapshots: true});

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const usersRef = db.collection("UsuariosData");

export default db;