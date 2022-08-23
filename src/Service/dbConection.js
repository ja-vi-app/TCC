import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Usar dotenv para guardar as credenciais
// const firebaseApp = initializeApp({
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
// });

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAIKldK649ZgUp-JESNwTT-_yhd9DZkKIM",
  authDomain: "crud-tcc-315b0.firebaseapp.com",
  projectId: "crud-tcc-315b0",
});

export const db = getFirestore(firebaseApp);
