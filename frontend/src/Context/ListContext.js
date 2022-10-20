import { collection } from "firebase/firestore";
import React from "react";
import { useContext, useState } from "react";
import { db } from "../Service/dbConection";
import { getDB } from "../Service/Utils/Functions";
import { RECORDED_MOVIES } from "../Service/Utils/Tables";
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

  async function changeListContext() {
    const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
    const data = await getDB(recordedMoviesCollectionRef);
    setListContext(data);
    resetCardDetail(null);
  }

  return (
    <ListContextContext.Provider value={listContext}>
      <ListContextUpdateContext.Provider value={changeListContext}>
        {children}
      </ListContextUpdateContext.Provider>
    </ListContextContext.Provider>
  );
}
