import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAm3dSyx0KoXthTr89lDmWH57HZaMMDkuQ",
  authDomain: "tcc-test-5d910.firebaseapp.com",
  projectId: "tcc-test-5d910",
  storageBucket: "tcc-test-5d910.appspot.com",
  messagingSenderId: "1032908621595",
  appId: "1:1032908621595:web:4db4aaf2ef2553a250f5be",
});

export const db = getFirestore(firebaseApp);
