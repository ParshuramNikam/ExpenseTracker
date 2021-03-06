// parshu
import firebase from 'firebase';
import "firebase/storage";

// deep
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1AKrkoDbPBLQ2wgZcJ1O794aV4pxfmTs",
    authDomain: "user-expense-tracker.firebaseapp.com",
    projectId: "user-expense-tracker",
    storageBucket: "user-expense-tracker.appspot.com",
    messagingSenderId: "568872062824",
    appId: "1:568872062824:web:fa63b80d440803e29410dd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = firebase.firestore()
const storage = firebase.storage();

export default app;
export { db, auth, storage }