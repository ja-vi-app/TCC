import React from "react";
import { useContext, useState } from "react";

const CardDetailContext = React.createContext();
const CardDetailUpdateContext = React.createContext();

export function useCardDetail() {
  return useContext(CardDetailContext);
}

export function useCardDetailUpdate() {
  return useContext(CardDetailUpdateContext);
}

export function CardDetailProvider({ children }) {
  const [cardDetail, setCardDetail] = useState(null);

  function changeCardDetail(newValue) {
    setCardDetail(newValue);
  }

  return (
    <CardDetailContext.Provider value={cardDetail}>
      <CardDetailUpdateContext.Provider value={changeCardDetail}>
        {children}
      </CardDetailUpdateContext.Provider>
    </CardDetailContext.Provider>
  );
}
