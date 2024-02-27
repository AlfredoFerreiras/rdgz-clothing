// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  orderBy,
  updateDoc,
} from "firebase/firestore";
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(firebaseApp);

export const singInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordUser = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createOrderForUser = async (userAuth, orderData) => {
  if (!userAuth) return;

  const ordersRef = collection(db, `users/${userAuth.uid}/orders`);
  const newOrderRef = doc(ordersRef); // Let Firestore generate the ID

  console.log("orderData", orderData);

  try {
    await setDoc(newOrderRef, {
      ...orderData,
      createdAt: new Date(), // Capture the order creation time
    });
    console.log("Order created successfully!");
  } catch (error) {
    console.error("Error creating order", error.message);
  }
};

export const getUserOrders = async (userAuth) => {
  if (!userAuth) return [];

  const ordersRef = collection(db, `users/${userAuth.uid}/orders`);
  const q = query(ordersRef, orderBy("createdAt", "desc")); // Assuming you want the newest orders first
  const querySnapshot = await getDocs(q);

  const orders = querySnapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));

  return orders;
};

// Function to update user profile information
export const updateUserProfileDocument = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, `users`, userAuth.uid);

  try {
    await updateDoc(userDocRef, {
      ...additionalInformation,
    });
    console.log("User document updated successfully");
  } catch (error) {
    console.error("Error updating user document", error.message);
  }
};

export const fetchUserById = async (userId) => {
  const userDocRef = doc(db, `users`, userId); // Reference to a specific user document
  try {
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Returns the user data if found
    } else {
      console.log("No such user!");
      return null; // Or handle as needed
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
};
