import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyBkhZEhWTOF3bRe0fWyAOqZzk9DNWvyqQY",
            authDomain: "gridconnect-psf21.firebaseapp.com",
            projectId: "gridconnect-psf21",
            storageBucket: "gridconnect-psf21.appspot.com",
            messagingSenderId: "687343266201",
            appId: "1:687343266201:web:bd406937047f63fd7dcb08",
            measurementId: "G-KF4RHPYXZ3"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    } catch (error) {
        console.log("Firebase admin initialization error: ", error.stack);
    }
}

export default firebase.firestore();