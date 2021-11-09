import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
// Get collection data
getDocs(colRef)
	.then((snapshot) => {
		let books = [];

		snapshot.docs.forEach((doc) => {
			books.push({
				...doc.data(),
				id: doc.id,
			});
		});

		console.log(books);
	})
	.catch((err) => {
		console.log(err.message);
	});
