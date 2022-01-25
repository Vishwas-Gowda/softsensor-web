import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import Draw from "../Draw/draw";
import Square from "../Shape/square";
import TypeText from "../Text/text";
import ShareLink from "../Share/shareLink";
import Line from "../Shape/line";
import Arrow from "../Shape/arrow";
import Circle from "../Shape/circle";
import RemoveObject from "../removeComponents";
import { useSelector } from "react-redux";
import { fabric } from "openseadragon-fabricjs-overlay";
import { CloseIcon } from "@chakra-ui/icons";

const TypeTools = ({ viewerId, typeToolsButtonHandler }) => {
  const { fabricOverlay } = useSelector(
    (state) => state.fabricOverlayState.viewerWindow[viewerId]
  );

  fabric.IText.prototype.onKeyDown = (e) => {
    if (e.ctrlKey === true && e.key === "Enter") {
      fabricOverlay.fabricCanvas().discardActiveObject();
    }
  };

  // const handleCloseButtonClick = () => {
  //   typeToolsButtonHandler(false);
  // };

  return (
    // <Box
    //   width="100%"
    //   boxSizing="border-box"
    //   borderRadius="3px"
    //   h="42px"
    //   top="124px"
    // >
      
      <HStack
      top="124px"
      pos="fixed"
        // paddingLeft="55px"
        // paddingTop="5px"
        // transform="scale(1.1)"
        // pos="absolute"
        // className="typetools_toolbar_box"
      >
        <Line viewerId={viewerId} />
        <Square viewerId={viewerId} />
        <Circle viewerId={viewerId} />
        <Draw viewerId={viewerId} />
        <TypeText viewerId={viewerId} />
        {/* <RemoveObject viewerId={viewerId} /> */}
      </HStack>
    // </Box>
  );
};

export default TypeTools;
