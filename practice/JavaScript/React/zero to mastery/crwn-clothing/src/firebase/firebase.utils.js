import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDGUrmwgZZp_P6hg5wotGgOiJ3pIfRutjA",
  authDomain: "crwn-db-4cb94.firebaseapp.com",
  databaseURL: "https://crwn-db-4cb94.firebaseio.com",
  projectId: "crwn-db-4cb94",
  storageBucket: "crwn-db-4cb94.appspot.com",
  messagingSenderId: "815923001715",
  appId: "1:815923001715:web:f6475cb411f30bf0cfad06",
  measurementId: "G-5FR27YDSNP",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
