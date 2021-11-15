import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

// Initialize Firebase
//database id?
initializeApp({
	apiKey: 'AIzaSyAX8oyBC10r_ID77XqsU7x1HuheE9YID-w',
	authDomain: 'uni-jas.firebaseapp.com',
	projectId: 'uni-jas',
	storageBucket: 'uni-jas.appspot.com',
	messagingSenderId: '137662725656',
	appId: '1:137662725656:web:9044d5e18e01e827a44d6d'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();
