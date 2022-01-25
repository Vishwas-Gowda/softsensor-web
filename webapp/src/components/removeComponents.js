import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import ToolbarButton from "./ViewerToolbar/button";
import { updateActivityFeed } from "../state/reducers/fabricOverlayReducer";
import { getCanvasImage, getTimestamp } from "../hooks/utility";
import TypeButton from "./typeButton";

const RemoveObject = ({ viewerId }) => {
  const { fabricOverlay, activityFeed } = useSelector(
    (state) => state.fabricOverlayState.viewerWindow[viewerId]
  );
  const [isActiveObject, setIsActiveObject] = useState();
  const dispatch = useDispatch();
  const { username, roomName, socket, alias } = useSelector(
    (state) => state.socketState
  );

  useEffect(() => {
    if (!fabricOverlay) return;

    const handleSelectionCleared = (e) => {
      setIsActiveObject(false);
    };
    const handleSelectionCreated = (e) => {
      setIsActiveObject(true);
    };

    const canvas = fabricOverlay.fabricCanvas();
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleRemoveObject = async () => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    // Object has children (ie. arrow has children objects triangle and line)
    if (activeObject.getObjects) {
      let objs = activeObject.getObjects();
      for (let i in objs) {
        canvas.remove(objs[i]);
      }
    }

    let message = {
      username: alias,
      color: activeObject._objects
        ? activeObject._objects[0].stroke
        : activeObject.stroke,
      action: "deleted",
      text: activeObject._objects ? activeObject._objects[1].text : "",
      timeStamp: getTimestamp(),
      type: activeObject._objects
        ? activeObject._objects[0].type
        : activeObject.type,
      image: null,
    };

    activeObject.set({ isExist: false });

    message.image = await getCanvasImage(viewerId);

    canvas.remove(activeObject);

    dispatch(
      updateActivityFeed({ id: viewerId, feed: [...activityFeed, message] })
    );

    socket.emit(
      "send_annotations",
      JSON.stringify({
        roomName,
        username,
        content: canvas,
        feed: [...activityFeed, message],
      })
    );
  };

  return (
    <TypeButton
      onClick={handleRemoveObject}
      icon={<RiDeleteBin6Line size={18} color="#151C25"/>}
      disabled={!isActiveObject}
      // backgroundColor={!isActiveObject ? "#898888" : "#dddddd"}
      // color={!isActiveObject ? "black" : "#3963c3"}
      // _focus={{ backgroundColor: "white", color: "black" }}
      // _hover={{ backgroundColor: !isActiveObject ? "#898888" : "#dddddd" }}
      title="Remove Item"
    />
  );
};

export default RemoveObject;
