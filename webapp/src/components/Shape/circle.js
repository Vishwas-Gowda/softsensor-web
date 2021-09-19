import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { fabric } from "openseadragon-fabricjs-overlay";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import useFabricHelpers from "../../hooks/use-fabric-helpers";
import {
  updateActive,
  updateShapeColor,
  updateShape,
  updateActiveShape,
} from "../../state/reducers/shapeReducer";
import { fonts } from "../Text/fontPicker";
import { updateActivityFeed } from "../../state/reducers/feedReducer";

import { getCanvasImage, getFontSize, getTimestamp } from "../../hooks/utility";
import { useMediaQuery } from "@chakra-ui/media-query";
import TypeButton from "../typeButton";
import { BsCircle } from "react-icons/bs";

const Circle = () => {
  const dispatch = useDispatch();
  const { color, fabricOverlay, viewer, activeTool } = useSelector(
    (state) => state.fabricOverlayState
  );
  const { username, roomName, alias, socket } = useSelector(
    (state) => state.socketState
  );
  const { zoomValue } = useSelector((state) => state.zoomState);
  const { activityFeed } = useSelector((state) => state.feedState);

  const { deselectAll } = useFabricHelpers();
  const isActive = activeTool === "Circle";

  const [shape, setShape] = useState(null);
  const [textbox, setTextbox] = useState(null);

  const myState = useSelector((state) => state.shapeState);
  const myStateRef = useRef(myState);
  const setMyState = (action, data) => {
    myStateRef.current = { ...myState, ...data };
    dispatch(action(data));
  };

  const screenSize = useMediaQuery([
    "(max-width: 1280px)",
    "(max-width: 1440px)",
    "(max-width: 1920px)",
    "(max-width: 2560px)",
  ]);

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

    if (isActive) {
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
  }, [isActive]);

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
      if (options.target || !myStateRef.current.isActive) {
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
        strokeWidth: 14,
      };

      /**
       * Circle
       */
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
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }
      const c = myStateRef.current;

      // Dynamically drag size element to the canvas
      const pointer = fabricOverlay.fabricCanvas().getPointer(options.e);

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

      fabricOverlay.fabricCanvas().renderAll();
    }

    const fontSize = getFontSize(screenSize, zoomValue);
    console.log(zoomValue, fontSize);

    // Create new Textbox instance and add it to canvas
    const createTextbox = ({ left, top, height }) => {
      const tbox = new fabric.IText("", {
        left: left,
        top: top + height + 2,
        fontFamily: fonts[0].fontFamily,
        fontSize: fontSize,
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

      let [left, top, height, width] = [
        currShape.left,
        currShape.top,
        currShape.height,
        currShape.width,
      ];

      if (currShape.type === "ellipse") {
        if (currShape.originX === "right") left -= width;
        if (currShape.originY === "bottom") height = 0;
      }

      createTextbox({
        left: left,
        top: top,
        height: height,
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
      if ("circle" === optionsTargetType) return;

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
  useEffect(async () => {
    if (!shape || !textbox) return;
    const canvas = fabricOverlay.fabricCanvas();

    let message = {
      username: alias,
      color: shape.stroke,
      action: "added",
      text: "",
      timeStamp: getTimestamp(),
      type: shape.type,
      object: shape,
      image: null,
    };

    if (textbox.text !== "") {
      canvas.remove(shape);
      canvas.remove(textbox);
      textbox.set({
        visible: false,
      });
      const group = new fabric.Group([shape, textbox], { isExist: true });
      canvas.add(group);
      message.text = textbox.text;
      message.object = group;
    } else {
      shape.set({ isExist: true });
    }

    message.image = await getCanvasImage();

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

  const handleClick = () => {
    dispatch(updateTool({ tool: isActive ? "" : "Circle" }));
  };
  return (
    <TypeButton
      icon={<BsCircle />}
      backgroundColor={isActive ? "#8fa8e1" : "#dddddd"}
      color={isActive ? "black" : "#3963c3"}
      label="Circle"
      onClick={handleClick}
    />
  );
};

export default Circle;
