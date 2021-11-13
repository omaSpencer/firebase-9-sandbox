import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	onSnapshot,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
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
// Real time collection data
onSnapshot(colRef, (snapshot) => {
	let books = [];

	snapshot.docs.forEach((doc) => {
		books.push({
			...doc.data(),
			id: doc.id,
		});
	});
});
// Adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
	e.preventDefault();

	addDoc(colRef, {
		title: addBookForm.title.value,
		author: addBookForm.author.value,
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
