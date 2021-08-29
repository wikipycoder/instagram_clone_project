import firebase from "firebase";


const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyCICqGcKWr-TDPm6V2_5VH7hc-FBU7zewg",
    authDomain: "instagram-clone-project-27a8a.firebaseapp.com",
    projectId: "instagram-clone-project-27a8a",
    storageBucket: "instagram-clone-project-27a8a.appspot.com",
    messagingSenderId: "20620410804",
    appId: "1:20620410804:web:9d7d8478f503ff42953ce1",
    measurementId: "G-2CYVGYF0NC"
});

const firestore = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { firestore, auth, storage }; 