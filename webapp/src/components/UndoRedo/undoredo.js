import React, { useState, useEffect } from "react";
import { IconButton, Flex} from "@chakra-ui/react";
import { RiArrowGoBackFill, RiArrowGoForwardLine } from "react-icons/ri";
// import useButtonSize from "hooks/use-button-size";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "fabric-history/src/index";
import ToolbarButton from "../ViewerToolbar/button";

const UndoRedo = ({viewerId}) => {
  // const buttonSize = useButtonSize();
  const { fabricOverlay } = useSelector((state) => state.fabricOverlayState.viewerWindow[viewerId]);
  const [canvas, setCanvas] = useState();
  const params = useParams();

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvasLocal = fabricOverlay.fabricCanvas();
    setCanvas(canvasLocal);
    canvasLocal.clearHistory();
  }, [fabricOverlay]);

  useEffect(() => {
    if (!params || !canvas) return;
    fabricOverlay.fabricCanvas().clearHistory();
    fabricOverlay.fabricCanvas().clear();
  }, [params.id]);

  const handleUndo = () => {
    fabricOverlay.fabricCanvas().undo();
  };

  const handleRedo = () => {
    fabricOverlay.fabricCanvas().redo();
  };

  return (
    <Flex ml="18px" >
        <ToolbarButton
          icon={<RiArrowGoBackFill color="#151C25"/>}
          onClick={handleUndo}
          title="Undo"
          mr="8px"
        />
        <ToolbarButton
          icon={<RiArrowGoForwardLine  color="#151C25"/>}
          onClick={handleRedo}
          title="Redo"
          mr="8px"
        />
    </Flex>
  );
};

export default UndoRedo;
