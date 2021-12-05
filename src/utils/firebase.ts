import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
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
	deleteDoc,
	doc,
	DocumentReference,
	getDoc,
	getFirestore,
	setDoc
} from 'firebase/firestore';

// Initialize Firebase
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

const storage = getStorage();
export const productsRef = ref(storage, 'products/');

export const userInfoDocument = (userId: string) =>
	doc(db, 'userInfo', userId) as DocumentReference<UserInfo>;

export type Product = {
	'id': string;
	'name-en': string;
	'name-sk': string;
	'price-base': number;
	'price-vat': number;
};

export const productsCollection = collection(
	db,
	'products'
) as CollectionReference<Product>;

export const productDocument = (id: string) =>
	doc(db, 'products', id) as DocumentReference<Product>;

export type BasketProduct = {
	user_id: string;
	product_id: string;
	amount: number;
};

export const BasketProductDocument = (userId: string, productId: string) =>
	doc(db, 'basket', userId + productId) as DocumentReference<BasketProduct>;

export const basketCollection = collection(
	db,
	'basket'
) as CollectionReference<BasketProduct>;

const getAmountOfProdInBasket = async (userId: string, productId: string) => {
	const basketProdDoc = BasketProductDocument(userId, productId);
	const docSnap = await getDoc(basketProdDoc);
	if (docSnap.exists()) {
		return docSnap.data().amount;
	}
	return 0;
};
export const addProductToBasket = async (
	userId: string,
	productId: string,
	amount: number
) => {
	const amountInBasket = await getAmountOfProdInBasket(userId, productId);
	const basketProdDoc = BasketProductDocument(userId, productId);
	return setDoc(basketProdDoc, {
		user_id: userId,
		product_id: productId,
		amount: amount + amountInBasket
	});
};

export const incrProductInBasket = async (
	userId: string,
	productId: string
) => {
	const amountInBasket = await getAmountOfProdInBasket(userId, productId);
	const basketProdDoc = BasketProductDocument(userId, productId);
	return setDoc(basketProdDoc, {
		user_id: userId,
		product_id: productId,
		amount: amountInBasket + 1
	});
};

export const decrProductInBasket = async (
	userId: string,
	productId: string
) => {
	const amountInBasket = await getAmountOfProdInBasket(userId, productId);
	const basketProdDoc = BasketProductDocument(userId, productId);
	if (amountInBasket < 2) {
		return removeProductFromBasket(userId, productId);
	}
	return setDoc(basketProdDoc, {
		user_id: userId,
		product_id: productId,
		amount: amountInBasket - 1
	});
};

export const removeProductFromBasket = (userId: string, productId: string) =>
	deleteDoc(BasketProductDocument(userId, productId));

export const getProduct = async (productId: string) => {
	const snap = await getDoc(productDocument(productId));
	return snap.data();
};

export const getUrl = async (id: string) =>
	await getDownloadURL(ref(productsRef, `${id}.jpg`));
