import React from "react";
import {Box, Text, HStack,Flex,Icon } from '@chakra-ui/react'
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
import Typebutton from "../typeButton"; 
import {SiTarget} from 'react-icons/si';
import {BsEraser} from 'react-icons/bs';
import {AiOutlineInfoCircle} from "react-icons/ai";

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
    
    <Flex
        direction="column"
        top="124px"
        pos="absolute"
        paddingLeft="55px"
        paddingTop="5px"
        transform="scale(1.1)"
        zIndex="1"
        className="typetools_toolbar_box"
        >
      <Flex h="5px" bgColor="rgba(236, 236, 236, 1)">
      </Flex>
      <HStack
        px="16px"
        h="42px"
        bgColor="rgba(248, 248, 245, 1)"
      >

{/* Add respective tools */}

        <Line viewerId={viewerId} />
        <Typebutton
        icon={<SiTarget size={18} color="rgba(21, 28, 37, 1)"/>} />

        <Square viewerId={viewerId} />
        <Circle viewerId={viewerId} />
        <Draw viewerId={viewerId} />
        <TypeText viewerId={viewerId} />

        <Typebutton
        icon={<BsEraser size={18} color="rgba(21, 28, 37, 1)"/>} />
        <Typebutton
        icon={<AiOutlineInfoCircle size={18} color="rgba(21, 28, 37, 1)"/>} />
      </HStack>
    {/* // </Box> */}
    </Flex>
  );
};

export default TypeTools;
