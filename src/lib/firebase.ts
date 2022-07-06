import {initializeApp} from 'firebase/app';
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence,
    signOut, type UserCredential, type User
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBzusLOWN7a_sSCbm2TvzO0G3rkNGDnYlE',
    authDomain: 'project-1007319276577.firebaseapp.com',
    projectId: 'abicos',
};

let isSetPersistance : boolean;

initializeApp(firebaseConfig);

const auth = getAuth();

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
