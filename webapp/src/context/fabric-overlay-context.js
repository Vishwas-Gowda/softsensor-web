import React from "react";
import { brandColors } from "../styles/brandPalette";

const FabricOverlayStateContext = React.createContext();
const FabricOverlayDispatchContext = React.createContext();

const getLocalUserCanvases = () => {
  const userCanvases = window.localStorage.getItem("userCanvases");
  if (!userCanvases) {
    window.localStorage.setItem("userCanvases", JSON.stringify({}));
    return {};
  } else {
    // console.log(userCanvases)
    return JSON.parse(userCanvases);
  }
};

const defaultState = {
  activeTool: null,
  activeUserCanvas: "",
  color: brandColors[0],
  fabricOverlay: null,
  isToolbarVisible: true,
  isToolSettingsVisible: false,
  userCanvases: getLocalUserCanvases(),
  viewer: null,
  username: "",
  roomName: "",
};

const fabricOverlayReducer = (state, action) => {
  switch (action.type) {
    case "toggleToolbarVisible": {
      return {
        ...state,
        isToolbarVisible: action.isVisible,
      };
    }
    case "toggleToolSettingsVisible": {
      return {
        ...state,
        isToolSettingsVisible: !state.isToolSettingsVisible,
      };
    }
    case "updateActiveUserCanvas": {
      return {
        ...state,
        activeUserCanvas: action.activeUserCanvas,
      };
    }
    case "updateColor": {
      return {
        ...state,
        color: action.color,
      };
    }
    case "updateOverlay": {
      return {
        ...state,
        fabricOverlay: action.fabricOverlay,
        viewer: action.viewer,
      };
    }
    case "updateTool": {
      return {
        ...state,
        activeTool: action.tool,
      };
    }
    case "updateUserCanvases": {
      // Update localStorage
      window.localStorage.setItem(
        "userCanvases",
        JSON.stringify(action.userCanvases)
      );

      // Update context state
      return {
        ...state,
        activeUserCanvas: action.activeUserCanvas,
        userCanvases: action.userCanvases,
      };
    }
    case "updateSocketDetails": {
      return {
        ...state,
        username: action.username,
        roomName: action.roomName,
      };
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
};

const FabricOverlayProvider = ({ initialState = defaultState, children }) => {
  const [state, dispatch] = React.useReducer(
    fabricOverlayReducer,
    initialState
  );
  return (
    <FabricOverlayStateContext.Provider value={state}>
      <FabricOverlayDispatchContext.Provider value={dispatch}>
        {children}
      </FabricOverlayDispatchContext.Provider>
    </FabricOverlayStateContext.Provider>
  );
};

const useFabricOverlayState = () => {
  const context = React.useContext(FabricOverlayStateContext);
  if (context === undefined) {
    throw new Error(
      "useFabricOverlayState must be used within a FabricOverlayProvider"
    );
  }
  return context;
};

const useFabricOverlayDispatch = () => {
  const context = React.useContext(FabricOverlayDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useFabricOverlayDispatch must be used within FabricOverlayProvider"
    );
  }
  return context;
};

export {
  FabricOverlayProvider,
  useFabricOverlayState,
  useFabricOverlayDispatch,
};
