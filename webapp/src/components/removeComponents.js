import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";
import ToolbarButton from "./ViewerToolbar/button";
import { updateActivityFeed } from "../state/reducers/feedReducer";
import { getTimestamp } from "../hooks/utility";

const RemoveObject = () => {
  const { fabricOverlay } = useSelector((state) => state.fabricOverlayState);
  const { activityFeed } = useSelector((state) => state.feedState);
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

  const handleRemoveObject = () => {
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
    };

    canvas.remove(activeObject);

    dispatch(updateActivityFeed([...activityFeed, message]));

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
    <ToolbarButton
      onClick={handleRemoveObject}
      icon={<DeleteIcon />}
      label="Remove item"
      disabled={!isActiveObject}
      color="#fff"
    />
  );
};

export default RemoveObject;
