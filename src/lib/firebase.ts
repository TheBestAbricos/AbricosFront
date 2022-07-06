import {initializeApp} from 'firebase/app';
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence,
    signOut, type UserCredential, type User
} from 'firebase/auth';
import * as fs from "firebase/firestore" 
const firebaseConfig = {
    apiKey: "AIzaSyBzusLOWN7a_sSCbm2TvzO0G3rkNGDnYlE",
    authDomain: "abicos.firebaseapp.com",
    projectId: "abicos",
    storageBucket: "abicos.appspot.com",
    messagingSenderId: "1007319276577",
    appId: "1:1007319276577:web:3ae3d6e77fbbe2779a9760"
};

let isSetPersistance : boolean;

initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = fs.getFirestore();

const initPersistance = async () : Promise<void> => {
    await setPersistence(auth, browserSessionPersistence);
    isSetPersistance = true;
}



export const createAccount = async (email: string, password: string) : Promise<UserCredential> => {
    const userCredentaials = await createUserWithEmailAndPassword(auth, email, password);
    return userCredentaials;
}

export const logIn = async (email: string, password: string) : Promise<UserCredential> => {
    const userCredentaials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentaials;
}

export const logOut = async () : Promise<void> => await signOut(auth);

export const getCurrentUser = async () : Promise<User | null> => {
    if (!isSetPersistance) {
        await initPersistance();
    } 
    return auth.currentUser;
}
