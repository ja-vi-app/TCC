import React, { useContext, useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "Service/dbConection";
import { getDB } from "Service/Utils/Functions";
import { RECORDED_MOVIES } from "Service/Utils/Tables";
import { useCardDetailUpdate } from "./CardDetailContext";

const ListContextContext = React.createContext();
const ListContextUpdateContext = React.createContext();

export function useListContext() {
  return useContext(ListContextContext);
}

export function useListContextUpdate() {
  return useContext(ListContextUpdateContext);
}

export function ListContextProvider({ children }) {
  const [listContext, setListContext] = useState(null);

  const resetCardDetail = useCardDetailUpdate();

  async function changeListContext(needReset) {
    const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
    const data = await getDB(recordedMoviesCollectionRef);
    setListContext(data);
    if (needReset) resetCardDetail(null);
  }

  return (
    <ListContextContext.Provider value={listContext}>
      <ListContextUpdateContext.Provider value={changeListContext}>
        {children}
      </ListContextUpdateContext.Provider>
    </ListContextContext.Provider>
  );
}
