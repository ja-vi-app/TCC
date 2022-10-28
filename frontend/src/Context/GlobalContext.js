import React from "react";
import { CardDetailProvider } from "./CardDetailContext";
import { FormCreateCardProvider } from "./FormCreateCardContext";
import { ListContextProvider } from "./ListContext";
import CustomThemeProvider from "./Theme";

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
