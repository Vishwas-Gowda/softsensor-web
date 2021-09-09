import React, { useState, useEffect, useRef } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import { useSelector, useDispatch } from "react-redux";
import DrawWidthPicker from "./widthPicker";
import ToolbarButton from "../ViewerToolbar/button";
import ToolbarOptionsPanel from "../ViewerToolbar/optionsPanel";
import { widths } from "./widthPicker";
// import logo from '../.../images/logo.png';
import useHexRGB from "../../hooks/use-hex-rgb";
import { updateActive } from "../../state/reducers/drawReducer";
import { fabric } from "openseadragon-fabricjs-overlay";
import { fonts } from "../Text/fontPicker";
import { updateActivityFeed } from "../../state/reducers/feedReducer";
import { getCanvasImage, getFontSize, getTimestamp } from "../../hooks/utility";
import { useMediaQuery } from "@chakra-ui/media-query";
import TypeButton from "../typeButton";

const getDrawCursor = (brushSize, brushColor) => {
  brushSize = brushSize < 12 ? 8 : brushSize;
  const circle = `
		<svg
			height="${brushSize}"
			fill="${brushColor}"
			viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${brushSize}" 
			/>
		</svg>
	`;

  return `data:image/svg+xml;base64,${window.btoa(circle)}`;
};

const createFreeDrawingCursor = (brushWidth, brushColor) => {
  return `url(${getDrawCursor(brushWidth, brushColor)}) ${brushWidth / 2} ${
    brushWidth / 2
  }, crosshair`;
};

const Draw = () => {
  const { color, fabricOverlay, viewer, activeTool } = useSelector(
    (state) => state.fabricOverlayState
  );
  const { username, roomName, alias, socket } = useSelector(
    (state) => state.socketState
  );
  const { activityFeed } = useSelector((state) => state.feedState);

  const dispatch = useDispatch();
  const { hexToRGBA } = useHexRGB();
  const isActive = activeTool === "DRAW";

  const [path, setPath] = useState(null);
  const [textbox, setTextbox] = useState(null);

  const myState = useSelector((state) => state.drawState);
  const myStateRef = useRef(myState.isActive);
  const setMyState = (data) => {
    myStateRef.current = data;
    dispatch(updateActive(data));
  };

  const screenSize = useMediaQuery([
    "(max-width: 1280px)",
    "(max-width: 1440px)",
    "(max-width: 1920px)",
    "(max-width: 2560px)",
  ]);

  // useEffect(() => {
  //   socket.emit("send_guest_list", { roomName, alias });
  // }, [isActive]);

  useEffect(() => {
    setMyState(isActive);
  }, [isActive]);

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    function handleMouseDown() {
      // console.log(activeTool);
      if (!myStateRef.current.isActive) return;
      // Need this as double protection to make sure OSD isn't swallowing
      // Fabric's drawing mode for some reason
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
    }
    canvas.on("mouse:down", handleMouseDown);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
    };
  }, [fabricOverlay]);

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();
    const zoomLevel = viewer.viewport.getZoom();

    const fontSize = getFontSize(screenSize, zoomLevel);

    // Create new Textbox instance and add it to canvas
    const createTextbox = ({ left, top, height }) => {
      const tbox = new fabric.IText("", {
        left: left,
        top: top + height + 10,
        fontFamily: fonts[0].fontFamily,
        fontSize: fontSize,
        selectionBackgroundColor: "rgba(255, 255, 255, 0.5)",
      });

      fabricOverlay.fabricCanvas().add(tbox);
      canvas.setActiveObject(tbox);
      tbox.enterEditing();
    };

    // to set path when draw completes
    const pathCreated = (e) => {
      setPath(e.path);
      createTextbox({
        left: e.path.left,
        top: e.path.top,
        height: e.path.height,
      });
    };

    const handleSelected = (options) => {
      // make text visible on selected object
      if (options && options.target.type === "group") {
        options.target.item(1).set({ visible: true });
      }

      // hide text on previous selected object (or deselected object)
      if (options.deselected && options.deselected[0].type === "group") {
        options.deselected[0].item(1).set({ visible: false });
      }
    };

    const handleSelectionCleared = (options) => {
      // hide text when no object is selected
      if (options.deselected && options.deselected[0].type === "group")
        options.deselected[0].item(1).set({ visible: false });

      // set textbox
      if (options.deselected && options.deselected[0].type === "i-text")
        setTextbox(options.deselected[0]);
    };

    if (isActive) {
      const brushWidth = myState.width.pixelWidth;
      // Enable Fabric drawing; disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = color.hex;
      canvas.freeDrawingBrush.width =
        zoomLevel <= 1 ? brushWidth : brushWidth / zoomLevel;

      canvas.renderAll();

      // EXAMPLE: of using an image for cursor
      // https://i.stack.imgur.com/fp7eL.png
      //canvas.freeDrawingCursor = `url(${logo}) 0 50, auto`;

      canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, color.hex);

      canvas.on("path:created", pathCreated);
      canvas.on("selection:cleared", handleSelectionCleared);
      canvas.on("selection:created", handleSelected);
      canvas.on("selection:updated", handleSelected);
      // console.log(canvas._objects)
    } else {
      // Disable Fabric drawing; enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
      canvas.isDrawingMode = false;
      canvas.freeDrawingCursor = "";
    }

    // Remove handler
    return () => {
      canvas.off("path:created", pathCreated);
      canvas.on("selection:cleared", handleSelectionCleared);
      canvas.on("selection:created", handleSelected);
      canvas.on("selection:updated", handleSelected);
    };
  }, [isActive]);

  useEffect(() => {
    // Update brush color and size with Fabric
    if (!fabricOverlay || !isActive) return;

    const canvas = fabricOverlay.fabricCanvas();
    const brushWidth = myState.width.pixelWidth;
    const zoomLevel = viewer.viewport.getZoom();

    canvas.freeDrawingBrush.color = color.hex;
    canvas.freeDrawingBrush.width =
      zoomLevel <= 1 ? brushWidth : brushWidth / zoomLevel;
    canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, color.hex);
  }, [color, myState.width]);

  // group drawing (path) and textbox together
  // first remove both from canvas then group them and then add group to canvas
  useEffect(async () => {
    if (!path || !textbox) return;
    const canvas = fabricOverlay.fabricCanvas();

    let message = {
      username: alias,
      color: path.stroke,
      action: "added",
      text: "",
      timeStamp: getTimestamp(),
      type: path.type,
      object: path,
      image: null,
    };

    if (textbox.text !== "") {
      canvas.remove(path);
      canvas.remove(textbox);
      textbox.set({
        visible: false,
      });
      const group = new fabric.Group([path, textbox], { isExist: true });
      canvas.add(group);
      message.text = textbox.text;
      message.object = group;
    } else {
      path.set({ isExist: true });
    }

    message.image = await getCanvasImage();

    setPath(null);
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

  const handleToolbarClick = () => {
    dispatch(updateTool({ tool: isActive ? "" : "DRAW" }));
  };

  return (
    <TypeButton
      onClick={handleToolbarClick}
      icon={<FaPaintBrush size={12} />}
      backgroundColor={isActive ? "#8fa8e1" : "#dddddd"}
      color={isActive ? "black" : "#3963c3"}
      label="Draw"
    />
  );
};

export default Draw;
