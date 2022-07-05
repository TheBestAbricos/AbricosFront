import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, type UserCredential} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBzusLOWN7a_sSCbm2TvzO0G3rkNGDnYlE',
    authDomain: 'project-1007319276577.firebaseapp.com',
    projectId: 'abicos',
};

initializeApp(firebaseConfig);
const auth = getAuth();

export const createAccount = async (email: string, password: string) : Promise<UserCredential> => {
    const userCredentaials = await createUserWithEmailAndPassword(auth, email, password);
    return userCredentaials;
}