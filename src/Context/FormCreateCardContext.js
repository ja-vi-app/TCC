import React from "react";
import { useContext, useState } from "react";

const FormCreateCardContext = React.createContext();
const FormCreateCardUpdateContext = React.createContext();

const initialState = {
  category: null,
  title: "",
  file: null,
};

export function useFormCreateCard() {
  return useContext(FormCreateCardContext);
}

export function useFormCreateCardUpdate() {
  return useContext(FormCreateCardUpdateContext);
}

export function FormCreateCardProvider({ children }) {
  const [formCreateCard, setFormCreateCard] = useState(null);

  function changeFormCreateCard(newValue) {
    setFormCreateCard(newValue);
    console.log("asd");
  }

  return (
    <FormCreateCardContext.Provider value={formCreateCard}>
      <FormCreateCardUpdateContext.Provider value={changeFormCreateCard}>
        {children}
      </FormCreateCardUpdateContext.Provider>
    </FormCreateCardContext.Provider>
  );
}
