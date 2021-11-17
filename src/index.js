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
} from 'firebase/firestore';

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
// Collection Ref
const colRef = collection(db, 'books');

// Queries
const q = query(colRef, orderBy('createdAt'));
// const q = query(colRef, where('author', '==', 'J.K. Rowling'), orderBy('createdAt'));

// Real time collection data
onSnapshot(q, (snapshot) => {
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

onSnapshot(docRef, (doc) => {
	console.log(doc.data(), doc.id);
});
