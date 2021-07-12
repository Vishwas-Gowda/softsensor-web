import React from "react";
import { useZoom } from "use-open-seadragon";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { useSelector } from "react-redux";

const ViewerControls = () => {
  const { viewer } = useSelector((state) => state.fabricOverlayState);
  const { zoomIn, zoomOut } = useZoom();
  // const buttonSize = useButtonSize();

  const handleZoomIn = (e) => {
    try {
      if (viewer.viewport.getMaxZoom() > viewer.viewport.getZoom()) {
        zoomIn();
      }
    } catch (e) {
      console.error("Error handling Zoom In button click", e);
    }
  };

  const handleZoomOut = (e) => {
    try {
      if (viewer.viewport.getMinZoom() < viewer.viewport.getZoom()) {
        zoomOut();
      }
    } catch (e) {
      console.error("Error handling Zoom Out button click", e);
    }
  };

  return (
    <Box position="absolute" right="20px" top="20px" zIndex="1">
      <ButtonGroup spacing="3" size="lg">
        <Tooltip label="Zoom in" aria-label="Zoom in">
          <IconButton
            icon={<FiZoomIn />}
            onClick={handleZoomIn}
            size="md"
            border="1px solid gray"
            borderRadius="25px"
          />
        </Tooltip>
        <Tooltip label="Zoom out" aria-label="Zoom out">
          <IconButton
            icon={<FiZoomOut />}
            onClick={handleZoomOut}
            size="md"
            border="1px solid gray"
            borderRadius="25px"
          />
        </Tooltip>
        {/* <Tooltip label="Undo" aria-label="Undo">
            <IconButton
              icon={<RiArrowGoBackFill />}
              aria-label="Undo"
              size={buttonSize}
              disabled
            />
          </Tooltip>
          <Tooltip label="Redo" aria-label="Redo">
            <IconButton
              icon={<RiArrowGoForwardLine />}
              aria-label="Redo"
              size={buttonSize}
              disabled
            />
          </Tooltip> */}
      </ButtonGroup>
    </Box>
  );
};

export default ViewerControls;
