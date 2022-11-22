import { deleteUser, getAuth } from "firebase/auth";
import {
  deleteDoc,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { toasterModel } from "Utils/Functions";
import { SESSION_STORAGE_ITEM, TOAST_TYPE } from "Utils/Constants";

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

export async function deleteCurrentUser() {
  const auth = getAuth();
  const user = auth.currentUser;

  return deleteUser(user)
    .then(() => {
      return true;
    })
    .catch(() => {
      toasterModel(
        "Falha ao deletar usuário tente novamente mais tarde",
        TOAST_TYPE.error
      );
      return false;
    });
}

export async function deleteAllDataByUser(collection, currentUserId) {
  const docRef = doc(collection, currentUserId);

  await deleteDB(docRef);
}
