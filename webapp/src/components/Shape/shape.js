import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ToolbarButton from "../ViewerToolbar/button";
import ToolbarOptionsPanel from "../ViewerToolbar/optionsPanel";
import { FaShapes } from "react-icons/fa";
import { fabric } from "openseadragon-fabricjs-overlay";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import ShapePicker from "./picker";
import useFabricHelpers from "../../hooks/use-fabric-helpers";
import {
  updateActive,
  updateShapeColor,
  updateShape,
  updateActiveShape,
} from "../../state/reducers/shapeReducer";
import { fonts } from "../Text/fontPicker";
import { updateActivityFeed } from "../../state/reducers/feedReducer";
import { getTimestamp } from "../../hooks/utility";

const FABRIC_SHAPE_TYPES = ["circle", "rect"];

const Shape = () => {
  const dispatch = useDispatch();
  const { color, fabricOverlay, viewer, activeTool } = useSelector(
    (state) => state.fabricOverlayState
  );
  const { username, roomName, alias, socket } = useSelector(
    (state) => state.socketState
  );
  const { activityFeed } = useSelector((state) => state.feedState);

  const { deselectAll } = useFabricHelpers();
  const isActive = activeTool === "SHAPE";

  const [shape, setShape] = useState(null);
  const [textbox, setTextbox] = useState(null);

  const myState = useSelector((state) => state.shapeState);
  const myStateRef = useRef(myState);
  const setMyState = (action, data) => {
    myStateRef.current = { ...myState, ...data };
    dispatch(action(data));
  };

  /**
   * Handle primary tool change
   */
  useEffect(() => {
    setMyState(updateActive, { activeShape: null, isActive: isActive });
  }, [isActive]);

  /**
   * Handle color change
   */
  useEffect(() => {
    setMyState(updateShapeColor, { color: color });
  }, [color.hex]);

  /**
   * Handle an individual shape being selected
   */
  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (myState.activeShape) {
      canvas.defaultCursor = "crosshair";

      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Deselect all Fabric Canvas objects
      deselectAll();
    } else {
      canvas.defaultCursor = "auto";

      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }
  }, [myState.activeShape]);

  /**
   * Add shapes and handle mouse events
   */
  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    /**
     * Mouse down
     */
    function handleMouseDown(options) {
      if (
        options.target ||
        !myStateRef.current.activeShape ||
        !myStateRef.current.isActive
      ) {
        return;
      }

      // Save starting mouse down coordinates
      let pointer = canvas.getPointer(options.e);
      let origX = pointer.x;
      let origY = pointer.y;

      // Create new Shape instance
      let newShape = null;
      const shapeOptions = {
        color: myStateRef.current.color.hex,
        left: origX,
        top: origY,
        width: 0,
        height: 0,
      };

      // Stroke fill
      let fillProps = {
        fill: "rgba(0,0,0,0)",
        stroke: shapeOptions.color,
        strokeWidth: 2,
      };

      // Shape options
      switch (myStateRef.current.activeShape.name) {
        /**
         * Square
         */
        case "square":
          newShape = new fabric.Rect({
            ...shapeOptions,
            ...fillProps,
            width: pointer.x - origX,
            height: pointer.y - origY,
          });
          fabricOverlay.fabricCanvas().add(newShape);
          break;

        /**
         * Circle
         */
        case "circle":
          newShape = new fabric.Ellipse({
            ...shapeOptions,
            ...fillProps,
            originX: "left",
            originY: "top",
            rx: pointer.x - origX,
            ry: pointer.y - origY,
            angle: 0,
          });
          fabricOverlay.fabricCanvas().add(newShape);
          break;

        default:
          break;
      }

      setMyState(updateShape, {
        ...myStateRef.current,
        currentDragShape: newShape,
        isMouseDown: true,
        origX,
        origY,
      });

      // Add new shape to the canvas
      //newShape && fabricOverlay.fabricCanvas().add(newShape);
    }

    /**
     * Mouse move
     */
    function handleMouseMove(options) {
      if (
        //options.target ||
        !myStateRef.current.activeShape ||
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }
      const c = myStateRef.current;

      // Dynamically drag size element to the canvas
      const pointer = fabricOverlay.fabricCanvas().getPointer(options.e);

      if (["square"].indexOf(c.activeShape.name) > -1) {
        /**
         * Rectangle or Triangle
         */
        if (c.origX > pointer.x) {
          c.currentDragShape.set({
            left: Math.abs(pointer.x),
          });
        }
        if (c.origY > pointer.y) {
          c.currentDragShape.set({ top: Math.abs(pointer.y) });
        }
        c.currentDragShape.set({
          width: Math.abs(c.origX - pointer.x),
          height: Math.abs(c.origY - pointer.y),
        });
      } else if (c.activeShape.name === "circle") {
        /**
         * Ellipse (circle)
         */
        let rx = Math.abs(c.origX - pointer.x) / 2;
        let ry = Math.abs(c.origY - pointer.y) / 2;
        if (rx > c.currentDragShape.strokeWidth) {
          rx -= c.currentDragShape.strokeWidth / 2;
        }
        if (ry > c.currentDragShape.strokeWidth) {
          ry -= c.currentDragShape.strokeWidth / 2;
        }
        c.currentDragShape.set({ rx, ry });

        if (c.origX > pointer.x) {
          c.currentDragShape.set({ originX: "right" });
        } else {
          c.currentDragShape.set({ originX: "left" });
        }
        if (c.origY > pointer.y) {
          c.currentDragShape.set({ originY: "bottom" });
        } else {
          c.currentDragShape.set({ originY: "top" });
        }
      }

      fabricOverlay.fabricCanvas().renderAll();
    }

    // Create new Textbox instance and add it to canvas
    const createTextbox = ({ left, top, height }) => {
      const tbox = new fabric.IText("", {
        left: left,
        top: top + height + 10,
        fontFamily: fonts[0].fontFamily,
        fontSize: 50,
        selectionBackgroundColor: "rgba(255, 255, 255, 0.5)",
      });

      fabricOverlay.fabricCanvas().add(tbox);
      canvas.setActiveObject(tbox);
      tbox.enterEditing();
    };

    /**
     * Mouse up
     */
    function handleMouseUp(options) {
      if (
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }

      fabricOverlay
        .fabricCanvas()
        .setActiveObject(myStateRef.current.currentDragShape);

      fabricOverlay.fabricCanvas().renderAll();

      const currShape = myStateRef.current.currentDragShape;

      setShape(myStateRef.current.currentDragShape);

      createTextbox({
        left: currShape.left,
        top: currShape.top,
        height: currShape.height,
      });

      setMyState(updateShape, {
        ...myStateRef.current,
        currentDragShape: null,
        isMouseDown: false,
      });
    }

    function handleSelectionCleared(options) {
      // hide text when no object is selected
      if (options.deselected && options.deselected[0].type === "group")
        options.deselected[0].item(1).set({ visible: false });

      // set textbox when deselected
      if (options.deselected && options.deselected[0].type === "i-text")
        setTextbox(options.deselected[0]);

      if (!myStateRef.current.isActive) return;

      setMyState(updateShape, {
        ...myStateRef.current,
      });
    }

    function handleSelected(options) {
      // make text visible on selected object
      if (options && options.target.type === "group") {
        options.target.item(1).set({ visible: true });
      }

      // hide text on previous selected object (or deselected object)
      if (options.deselected && options.deselected[0].type === "group") {
        options.deselected[0].item(1).set({ visible: false });
      }

      if (!myStateRef.current.isActive) return;

      // Filter out any non-shape selections
      const optionsTargetType = options.target.get("type");
      if (
        !FABRIC_SHAPE_TYPES.find((shapeType) => shapeType === optionsTargetType)
      )
        return;

      setMyState(updateShape, {
        ...myStateRef.current,
      });
    }

    // Add click handlers
    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);
    canvas.on("selection:created", handleSelected);
    canvas.on("selection:updated", handleSelected);
    canvas.on("selection:cleared", handleSelectionCleared);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
      canvas.off("selection:created", handleSelected);
      canvas.off("selection:updated", handleSelected);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [fabricOverlay]);

  // group shape and textbox together
  // first remove both from canvas then group them and then add group to canvas
  useEffect(() => {
    if (!shape || !textbox) return;
    const canvas = fabricOverlay.fabricCanvas();

    let message = {
      username: alias,
      color: shape.stroke,
      action: "added",
      text: "",
      timeStamp: getTimestamp(),
    };

    if (textbox.text !== "") {
      canvas.remove(shape);
      canvas.remove(textbox);
      textbox.set({
        visible: false,
      });
      const group = new fabric.Group([shape, textbox], {});
      canvas.add(group);
      message.text = textbox.text;
    }

    setShape(null);
    setTextbox(null);

    dispatch(updateActivityFeed([...activityFeed, message]));

    // send annotation
    socket.emit(
      "send_annotations",
      JSON.stringify({
        roomName,
        username,
        content: canvas,
        feed: [...activityFeed, message],
      })
    );
  }, [textbox]);

  const handleShapeSelect = (shape) => {
    setMyState(updateActiveShape, { activeShape: shape });
  };

  const handleToolbarClick = () => {
    dispatch(updateTool({ tool: isActive ? "" : "SHAPE" }));
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarClick}
        icon={<FaShapes />}
        isActive={isActive}
        label="Shape"
        color="#fff"
      />
      {isActive && (
        <ToolbarOptionsPanel>
          <ShapePicker handleShapeSelect={handleShapeSelect} />
        </ToolbarOptionsPanel>
      )}
    </>
  );
};

export default Shape;
