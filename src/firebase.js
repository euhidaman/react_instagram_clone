import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAydGYqIDDArk8Og1RnQCLcNr3SvZkvhOM",
    authDomain: "aman-instagram-clone.firebaseapp.com",
    projectId: "aman-instagram-clone",
    storageBucket: "aman-instagram-clone.appspot.com",
    messagingSenderId: "517048983441",
    appId: "1:517048983441:web:68941b4ae06d6fa2a80430",
    measurementId: "G-14MK7F1WN0"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage };