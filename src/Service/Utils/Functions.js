import { db } from "../dbConection";

import { doc, deleteDoc, getDocs, query, where, addDoc } from "firebase/firestore";
import { SESSION_STORAGE_ITEM } from "../../Utils/Constants";

export async function getDB(
  collection,
  currentUserId = sessionStorage.getItem(SESSION_STORAGE_ITEM.userUid)
) {
  const q = query(collection, where("owner", "==", currentUserId));

  const data = await getDocs(q);
  return data.docs.map((item) => ({ ...item.data(), id: item.id }));
}

export function addDB(collection, data) {
  return addDoc(collection, data);
}

export function deleteDB(collection, id) {
  const deleteData = doc(db, collection, id);
  return deleteDoc(deleteData);
}
