import { db } from "../dbConection";

import { doc, deleteDoc, getDocs, query, where, setDoc } from "firebase/firestore";
import { SESSION_STORAGE_ITEM } from "../../Utils/Constants";

export async function getDB(
  collection,
  currentUserId = sessionStorage.getItem(SESSION_STORAGE_ITEM.userUid)
) {
  const q = query(collection, where("owner", "==", currentUserId));

  const data = await getDocs(q);
  return data.docs.map((item) => ({ ...item.data(), id: item.id }));
}

export function testa(embed_id) {
  const docRef = doc(db, "recorded-movies", "CWSUjs5M4HUoG2FtCiQt");
  setDoc(docRef, { embed_id }, { merge: true })
    .then((docRef) => {
      console.log("Document Field has been updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function addDB(collection, data) {
  return setDoc(collection, data);
}

export function updateDB(collection, data) {
  return setDoc(collection, data, { merge: true });
}

export function deleteDB(collection, id) {
  const deleteData = doc(db, collection, id);
  return deleteDoc(deleteData);
}
