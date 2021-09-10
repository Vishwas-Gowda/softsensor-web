import React, { useRef, useEffect } from "react";
// import PropTypes from 'prop-types';
import ToolbarButton from "../ViewerToolbar/button";
import { FiType } from "react-icons/fi";
import { fabric } from "openseadragon-fabricjs-overlay";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import TypeTextFontPicker from "./fontPicker";
import ToolbarOptionsPanel from "../ViewerToolbar/optionsPanel";
import { fonts } from "./fontPicker";
import FontFaceObserver from "fontfaceobserver";
import useFabricHelpers from "../../hooks/use-fabric-helpers";
import {
  updateColorActive,
  editing,
  selectionCleared,
  selected,
  fontChange,
} from "../../state/reducers/textReducer";
import TypeButton from "../typeButton";

const TypeText = () => {
  const dispatch = useDispatch();
  const { color, fabricOverlay, viewer, activeTool } = useSelector(
    (state) => state.fabricOverlayState
  );
  const { deselectAll } = useFabricHelpers();
  const isActive = activeTool === "TYPE";

  const myState = useSelector((state) => state.textState);
  const myStateRef = useRef(myState);
  const setMyState = (action, data) => {
    myStateRef.current = { ...myState, ...data };
    dispatch(action(data));
  };
  /**
   * Handle main tool change
   */
  useEffect(() => {
    setMyState(updateColorActive, { color: color, isActive: isActive });

    if (!fabricOverlay) return;
    fabricOverlay.fabricCanvas().defaultCursor = isActive ? "text" : "auto";
  }, [color, isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (myState.isEditing) {
      fabricOverlay.fabricCanvas().defaultCursor = "auto";
      fabricOverlay.fabricCanvas().hoverCursor = "text";
    } else {
      fabricOverlay.fabricCanvas().defaultCursor = "text";
      fabricOverlay.fabricCanvas().hoverCursor = "move";
    }
  }, [myState.isEditing]);

  /**
   * Handle an individual font being selected
   */
  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (myState.activeFont) {
      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Deselect all Fabric Canvas objects
      deselectAll();
    } else {
      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }
  }, [myState.activeFont]);

  /**
   * Set up event handlers when Fabric is ready
   */
  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    function handleMouseDown(options) {
      // Selected an existing object OR not in Type Tool mode
      if (options.target || !myStateRef.current.isActive) {
        return;
      }

      // Was user previously editing text?
      if (myStateRef.current.isEditing) {
        deselectAll();
        setMyState(editing, { ...myStateRef.current, isEditing: false });
        return;
      }

      // Create new Textbox instance and add it to canvas
      const textbox = new fabric.IText("", {
        left: options.absolutePointer.x,
        top: options.absolutePointer.y,
        fontFamily: myStateRef.current.activeFont.fontFamily,
        fontSize: 15,
        selectionBackgroundColor: "rgba(255, 255, 255, 0.5)",
      });
      fabricOverlay.fabricCanvas().add(textbox);
      textbox.set({ fill: myStateRef.current.color.hex });
      canvas.setActiveObject(textbox);
      textbox.enterEditing();

      setMyState(editing, {
        ...myStateRef.current,
        isEditing: true,
      });
    }

    function handleSelectionCleared(options) {
      if (!myStateRef.current.isSelectedOnCanvas) return;

      setMyState(selectionCleared, {
        ...myStateRef.current,
        selectedCoords: { top: 0, left: 0 },
      });
    }

    function handleSelected(options) {
      if (options.target.get("type") !== "textbox") return;

      setMyState(selected, {
        ...myStateRef.current,
      });
    }

    // Add click handlers
    canvas.on("mouse:down", handleMouseDown);
    canvas.on("selection:created", handleSelected);
    canvas.on("selection:updated", handleSelected);
    canvas.on("selection:cleared", handleSelectionCleared);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("selection:created", handleSelected);
      canvas.off("selection:updated", handleSelected);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleFontChange = (font) => {
    setMyState(fontChange, { activeFont: font });
    //loadAndUse(font.fontFamily);
  };

  const handleToolbarButtonClick = (e) => {
    dispatch(updateTool({ tool: isActive ? "" : "TYPE" }));
  };

  const loadAndUse = (font) => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
      return;
    }

    var myfont = new FontFaceObserver(font);
    myfont
      .load()
      .then(function () {
        // when font is loaded, use it.
        canvas.getActiveObject().set("fontFamily", font);
        canvas.requestRenderAll();
      })
      .catch(function (e) {
        console.error(e);
      });
  };

  return (
    <TypeButton
      onClick={handleToolbarButtonClick}
      icon={<FiType />}
      backgroundColor={isActive ? "#8fa8e1" : "#dddddd"}
      color={isActive ? "black" : "#3963c3"}
      label="Type Text"
    />
    // {isActive && (
    //   <ToolbarOptionsPanel>
    //     <TypeTextFontPicker handleFontChange={handleFontChange} />
    //   </ToolbarOptionsPanel>
    // )}
  );
};

export default TypeText;
