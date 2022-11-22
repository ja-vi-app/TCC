import React from "react";
import { CardDetailProvider } from "Context/CardDetailContext";
import { FormCreateCardProvider } from "Context/FormCreateCardContext";
import { ListContextProvider } from "Context/ListContext";
import CustomThemeProvider from "Context/Theme";

export const combineComponents = (...components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};

const providers = [
  CustomThemeProvider,
  CardDetailProvider,
  ListContextProvider,
  FormCreateCardProvider,
];

export const AppContextProvider = combineComponents(...providers);
