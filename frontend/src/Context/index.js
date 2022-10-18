import { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

const MaterialUI = createContext();

MaterialUI.displayName = "MaterialUIContext";

function reducer(state, action) {
  switch (action.type) {
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MaterialUIControllerProvider({ children }) {
  const initialState = {
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export { MaterialUIControllerProvider, useMaterialUIController, setDarkMode };
