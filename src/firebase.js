import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCuu1K9KZAP7PmAJO3Lf-i68ptcXJjnRsE',
	authDomain: 'invoice-5dd66.firebaseapp.com',
	projectId: 'invoice-5dd66',
	storageBucket: 'invoice-5dd66.appspot.com',
	messagingSenderId: '338526898835',
	appId: '1:338526898835:web:632222600a90c6374ddb66'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //firestore db
const auth = firebase.auth();
// const storage = firebase.storage(); // firebase storage
// const provider = new firebase.auth.GoogleAuthProvider();  //for signin with google

export { db, auth };
