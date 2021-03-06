import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	query,
	where,
	orderBy,
	serverTimestamp,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCAA3cHZ7Nmj3cRXvEBRJPdX9Wfm6NGo4o',
	authDomain: 'fir-9-sandbox.firebaseapp.com',
	projectId: 'fir-9-sandbox',
	storageBucket: 'fir-9-sandbox.appspot.com',
	messagingSenderId: '111060663349',
	appId: '1:111060663349:web:8841a2dbc677f50435457c',
};

// Init app
initializeApp(firebaseConfig);

// Init services
const db = getFirestore();
const auth = getAuth();

// Collection Ref
const colRef = collection(db, 'books');

// Queries
const q = query(colRef, orderBy('createdAt'));
// const q = query(colRef, where('author', '==', 'J.K. Rowling'), orderBy('createdAt'));

// Real time collection data
const unsubCol = onSnapshot(q, (snapshot) => {
	let books = [];

	snapshot.docs.forEach((doc) => {
		books.push({
			...doc.data(),
			id: doc.id,
		});
	});

	console.log(books);
});
// Adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
	e.preventDefault();

	addDoc(colRef, {
		title: addBookForm.title.value,
		author: addBookForm.author.value,
		createdAt: serverTimestamp(),
	})
		.then(() => {
			addBookForm.reset();
		})
		.catch((err) => {
			console.error(err.message);
		});
});
// Deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const docRef = doc(db, 'books', deleteBookForm.id.value);

	deleteDoc(docRef)
		.then(() => {
			deleteBookForm.reset();
		})
		.catch((err) => {
			console.error(err.message);
		});
});
// Get a single document by ID
const docRef = doc(db, 'books', 'MFBWohCJ05w0JQDMVUqG');

getDoc(docRef).then((doc) => {
	console.log(doc.data(), doc.id);
});

const unsubDoc = onSnapshot(docRef, (doc) => {
	console.log(doc.data(), doc.id);
});
// Updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const docRef = doc(db, 'books', updateForm.id.value);

	updateDoc(docRef, {
		title: 'Updated title',
	}).then(() => {
		updateForm.reset();
	});
});
// Sign up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signupForm.email.value;
	const password = signupForm.password.value;

	createUserWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			// console.log('user created: ', cred.user);
			signupForm.reset();
		})
		.catch((err) => {
			console.log(err.message);
		});
});
// Logging in and out
const logoutBtn = document.querySelector('.logout');
logoutBtn.addEventListener('click', () => {
	signOut(auth)
		.then(() => {
			// console.log('The user signed out.');
		})
		.catch((err) => {
			console.log(err.message);
		});
});

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = loginForm.email.value;
	const password = loginForm.password.value;

	signInWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			// console.log('User logged in:', cred.user);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
// Subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
	console.log('User status changes:', user);
});
// Unsubscribe from db/auth changes
const unsubscribeBtn = document.querySelector('.unsub');
unsubscribeBtn.addEventListener('click', () => {
	console.log('Unsubscribing');

	unsubCol();
	unsubDoc();
	unsubAuth();
});
