import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCR01RHLH_VqmZZ_JiKqnSpvTjdOgamLoY",
    authDomain: "firejet-c0388.firebaseapp.com",
    projectId: "firejet-c0388",
    storageBucket: "firejet-c0388.firebasestorage.app",
    messagingSenderId: "25040589352",
    appId: "1:25040589352:web:7897bd33ae00146fd05b1d",
    measurementId: "G-4BNLM2Z3N3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export { db, analytics }