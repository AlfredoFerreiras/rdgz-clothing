// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRVifjXG6hVR3wGjLRsNZv9XT-Q4FH0d0",
  authDomain: "rdgz-clothing.firebaseapp.com",
  projectId: "rdgz-clothing",
  storageBucket: "rdgz-clothing.appspot.com",
  messagingSenderId: "664621543478",
  appId: "1:664621543478:web:260f5afb693f800d94e897",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const singInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, `users`, userAuth.uid);

  console.log(userDocRef);
};
