import { React, useState, useEffect } from "react";
import { useZoom, OpenSeadragon } from "use-open-seadragon";
import "./zoom-levels";
import "./openseadragon-scalebar";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Portal,
  Tooltip,
  VStack,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ZoomSlider from "../ZoomSlider/slider";
import { updateCurrentViewer } from "../../state/reducers/viewerReducer";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import ToolbarButton from "../ViewerToolbar/button";

const ViewerControls = ({ viewerId }) => {
  const { viewerWindow } = useSelector((state) => state.fabricOverlayState);
  const { currentViewer, isMultiView } = useSelector(
    (state) => state.viewerState
  );
  const { viewer } = viewerWindow[viewerId];
  const dispatch = useDispatch();
  const [scalebar, setScalebar] = useState(null);

  // const buttonSize = useButtonSize();

  // viewer = new OpenSeadragon({id: "viewer1"});

  const handleZoomIn = (e) => {
    try {
      if (viewer.viewport.getMaxZoom() > viewer.viewport.getZoom()) {
        viewer.viewport.zoomBy(1.0 / 0.7);
      }
    } catch (e) {
      console.error("Error handling Zoom In button click", e);
    }
  };

  const handleZoomOut = (e) => {
    try {
      if (viewer.viewport.getMinZoom() < viewer.viewport.getZoom()) {
        viewer.viewport.zoomBy(0.7);
      }
    } catch (e) {
      console.error("Error handling Zoom Out button click", e);
    }
  };

  useEffect(() => {
    if (viewer) {
      const scalebarInit = viewer.scalebar({
        type: 1,
        pixelsPerMeter: 250000,
        minWidth: "75px",
        maxWidth: "75px",
        location: 4,
        xOffset: 5,
        yOffset: 10,
        stayInsideImage: true,
        color: "white",
        fontColor: "white",
        backgroundColor: "black",
        fontSize: "14px",
        barThickness: 2,
        stayInsideImage: false,
      });

      setScalebar(scalebarInit);
    }
  }, [viewer]);

  const ZoomButton = (restProps) => {
    return (
      <IconButton
        size="sm"
        // backgroundColor="#E4E5E8"
        // boxShadow="lg"
        // _focus={{ border: "none" }}
        {...restProps}
      />
    );
  };

  const handleSelectSlide = () => {
    if (currentViewer === viewerId) return;
    // const { fabricOverlay } = viewerWindow[currentViewer];
    // fabricOverlay.fabricCanvas().discardActiveObject();
    // fabricOverlay.fabricCanvas().defaultCursor = "default";
    // fabricOverlay.fabricCanvas().hoverCursor = "move";
    // dispatch(updateTool({ tool: "Move" }));
    dispatch(updateCurrentViewer(viewerId));
  };

  return (
    <>
      {isMultiView && (
        <Box position="absolute" left="20px" top="20px" zIndex="1">
          <HStack color="blue.400" fontSize={10}>
            <Text as="button">View Details</Text>
            <Text onClick={handleSelectSlide} as="button">
              Select this slide
            </Text>
          </HStack>
          <Text fontWeight="bold">Slide {viewerId.slice(-1)}: Name/info</Text>
        </Box>
      )}
      <Box zIndex="1" mr="25px">
        {/* <ButtonGroup spacing="3" size="lg">
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
          </Tooltip>  
      </ButtonGroup> */}
        <HStack
          // w="fit-content"
          // backgroundColor="white"
          // border="1px solid #3965C6"
          // borderRadius="5px"
          // p={1}
        >
          <ToolbarButton
            icon={<AiOutlinePlus color="#151C25" size={18} />}
            // border="1px solid #3965C6"
            backgroundColor="#F8F8F5"
            onClick={handleZoomIn}
            title="Zoom In"
            mr="0px"
          />
          <ZoomSlider viewerId={viewerId} />
          <ToolbarButton
            icon={<AiOutlineMinus color="#151C25" size={18} />}
            // border="1px solid #3965C6"
            backgroundColor="#F8F8F5"
            onClick={handleZoomOut}
            title="Zoom Out"
            mr="0px"
          />
        </HStack>
      </Box>
    </>
  );
};

export default ViewerControls;
