import { deleteDoc, getDocs, query, where, setDoc } from "firebase/firestore";
import { SESSION_STORAGE_ITEM } from "Utils/Constants";

export async function getDB(
  collection,
  currentUserId = sessionStorage.getItem(SESSION_STORAGE_ITEM.userUid)
) {
  const q = query(collection, where("owner", "==", currentUserId));

  const data = await getDocs(q);
  return data.docs.map((item) => ({ ...item.data(), id: item.id }));
}

export function addDB(collection, data) {
  return setDoc(collection, data);
}

export function updateDB(collection, data) {
  return setDoc(collection, data, { merge: true });
}

export function deleteDB(dataWithId) {
  return deleteDoc(dataWithId);
}
