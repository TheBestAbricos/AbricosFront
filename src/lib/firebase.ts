import { initializeApp } from 'firebase/app';
import * as fbAuth from 'firebase/auth';
import * as fs from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBzusLOWN7a_sSCbm2TvzO0G3rkNGDnYlE',
	authDomain: 'abicos.firebaseapp.com',
	projectId: 'abicos',
	storageBucket: 'abicos.appspot.com',
	messagingSenderId: '1007319276577',
	appId: '1:1007319276577:web:3ae3d6e77fbbe2779a9760',
};

initializeApp(firebaseConfig);

export const auth = fbAuth.getAuth();
export const firestore = fs.getFirestore();

async function createUserDocument(userCredentaials: fbAuth.UserCredential) {
	const userDoc = fs.doc(fs.collection(firestore, 'users'), userCredentaials.user.uid);
	const userData = {
		UID: userCredentaials.user.uid,
		currentFolder: '',
		email: userCredentaials.user.email,
		firstName: '',
		lastName: '',
		avatar: '/images/profile-images/user-default-logo.png',
		tags: [
			{
				text: 'important',
				color: '#ff1234',
				colorText: '#000000',
			},
		],
	};
	await fs.setDoc(userDoc, userData);
}

export const initPersistance = async (): Promise<void> => {
	await fbAuth.setPersistence(auth, fbAuth.browserSessionPersistence);
};

// await initPersistance();

export const createAccount = async (
	email: string,
	password: string,
): Promise<fbAuth.UserCredential> => {
	const userCredentaials = await fbAuth.createUserWithEmailAndPassword(auth, email, password);
	await createUserDocument(userCredentaials);
	return userCredentaials;
};

export const logIn = async (email: string, password: string): Promise<fbAuth.UserCredential> => {
	const userCredentaials = await fbAuth.signInWithEmailAndPassword(auth, email, password);
	return userCredentaials;
};

export const logOut = async (): Promise<void> => {
	await fbAuth.signOut(auth);
};
export const getCurrentUser = (): fbAuth.User => auth.currentUser as fbAuth.User;
