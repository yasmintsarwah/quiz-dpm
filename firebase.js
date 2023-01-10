import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEdJDwzjbLj5FR8jXbuzqvYA8BzEleTBA",
  authDomain: "signal-clone-df09f.firebaseapp.com",
  projectId: "signal-clone-df09f",
  storageBucket: "signal-clone-df09f.appspot.com",
  messagingSenderId: "691848751442",
  appId: "1:691848751442:web:1b68d803bf1f9d97d6328b"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };