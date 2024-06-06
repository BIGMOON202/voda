import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBPSilhv-8nygf-wcmlwZUsO_3cT0GLdCc",
    authDomain: "voda-sports.firebaseapp.com",
    databaseURL: "https://voda-sports-default-rtdb.firebaseio.com",
    projectId: "voda-sports",
    storageBucket: "voda-sports.appspot.com",
    messagingSenderId: "745354922456",
    appId: "1:745354922456:web:29a98560c7e4516e4ccaad",
    measurementId: "G-FKJFWB0784"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const imageDb = getStorage(app);

// Get auth instance from Firebase App
const auth = getAuth(app);

export { auth, app, db, imageDb };