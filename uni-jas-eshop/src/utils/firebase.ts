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
	setDoc,
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

export type UserInfo = {
	email: string;
	city: string;
	houseNumber: string;
	street: string;
	postalCode: string;
	phone: string;
};

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const saveUserInfo = (props: UserInfo) => {
	if (!auth.currentUser) {
		throw 'User now found';
	}
	return setDoc(userInfoDocument(auth.currentUser?.uid), props);
};

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

export const userInfoDocument = (userId: string) =>
	doc(db, 'userInfo', userId) as DocumentReference<UserInfo>;

export type Product = {
	id: number;
	name: string;
	price: number;
	description: string | undefined;
	image?: string;
};

export const products: Product[] = [
	{
		id: 1,
		name: 'Audi',
		price: 100,
		description: 'German car.',
		image: 'audi.jpg'
	},
	{
		id: 2,
		name: 'BMW',
		price: 80,
		description: 'Another german car.',
		image: 'bmw.jpeg'
	},
	{
		id: 3,
		name: 'Mercedes-Benz',
		price: 120,
		description: 'Yet another german car.',
		image: 'mercedes.jpg'
	},
	{
		id: 4,
		name: 'Porsche',
		price: 180,
		description: 'German machine.',
		image: 'porsche.jpg'
	},
	{
		id: 5,
		name: 'Nissan',
		price: 200,
		description: 'Sutututututu.',
		image: 'nissan.jpg'
	}
];
