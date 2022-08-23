import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../dbConection";

export async function getDB(collection) {
  const data = await getDocs(collection);

  return data.docs.map((item) => ({ ...item.data(), id: item.id }));
}

export function addDB(collection, data) {
  return addDoc(collection, data);
}

export function deleteDB(table, id) {
  const deleteData = doc(db, table, id);
  return deleteDoc(deleteData);
}
