import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Usar dotenv para guardar as credenciais
// const firebaseApp = initializeApp({
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
// });

export const firebaseApp = initializeApp({
  // apiKey: "AIzaSyAIKldK649ZgUp-JESNwTT-_yhd9DZkKIM",
  // authDomain: "crud-tcc-315b0.firebaseapp.com",
  // projectId: "crud-tcc-315b0",

  apiKey: "AIzaSyAIKldK649ZgUp-JESNwTT-_yhd9DZkKIM",
  authDomain: "crud-tcc-315b0.firebaseapp.com",
  projectId: "crud-tcc-315b0",
  storageBucket: "crud-tcc-315b0.appspot.com",
  messagingSenderId: "688890330763",
  appId: "1:688890330763:web:67d5f283b97292101a9e8e",
  measurementId: "G-PQEK0Z9V57",
});

export const db = getFirestore(firebaseApp);
