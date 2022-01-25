import { React } from "react";
import { BsArrowsMove,BsCircleHalf } from "react-icons/bs";
import { RiNavigationFill ,RiPencilRulerLine } from "react-icons/ri";
import {IoMdRefresh} from 'react-icons/io';
import {AiOutlineSliders} from 'react-icons/ai';
import ToolbarButton from "../ViewerToolbar/button";
import Screenshot from "../Screenshot/screenshot";
import MultiView from "../MultiView/multiView";
import ToolbarPointerControl from "../ViewerToolbar/pointerControl";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Rotate from "../Rotate/Rotate";
import TypeTools from "../AdjustmentBar/typeTools";

const Move = ({ viewerId, toolsButtonHandler }) => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);
  const dispatch = useDispatch();
  const [typeToolsToggle, setTypeToolsToggle] = useState(false);

  const isActive = activeTool === "Pencil";
  const handleAnnotationsClick = () => {
    dispatch(updateTool({ tool: isActive ? "" : "Pencil" }));
    setTypeToolsToggle(typeToolsToggle => !typeToolsToggle);
  };

  const handleClick = () => {
    dispatch(updateTool({ tool: isActive ? "" : "Select" }));
  };

  return (
    <Flex direction="column">
    <Flex alignItems="center" mx="16px" >
      <ToolbarButton
        icon={<RiNavigationFill size={18} color="#151C25"/>}
        title="Select"
        // backgroundColor={isActive ? "#E4E5E8" : ""}
        // border={isActive ? " 0.5px solid #00153F" :""}
        // onClick={handleClick}
      />
      <ToolbarButton
        icon={<BsArrowsMove   size={18} color="#151C25"/>}
        title="Move"
      />
      <Rotate viewerId={viewerId}/>
      <ToolbarButton
      icon={<HiOutlinePencilAlt size={18} color='#151C25'/>}
      backgroundColor={isActive ? "#E4E5E8" : ""}
        border={isActive ? " 0.5px solid #00153F" :""}
      title="Annotations"
      onClick={handleAnnotationsClick}
      />
      
      <ToolbarButton
      icon={<AiOutlineSliders size={18} color='#151C25'/>}
      title="Filters"
      />
      <ToolbarButton
      icon={<BsCircleHalf size={18} color='#151C25'/>}
      title=""
      />
      <ToolbarButton
      icon={<RiPencilRulerLine size={18} color='#151C25'/>}
      title=""
      />

    </Flex>
    {/* <Flex>
    {typeToolsToggle ? (
          <TypeTools
            viewerId={viewerId}
            typeToolsButtonHandler={setTypeToolsToggle}
          />
        ) : (
          ""
        )}
    </Flex> */}
      {/* <Box
        width="100%"
        height="6em"
        borderRight="0.5px solid white"
        boxSizing="border-box"
        borderRadius="3px"
      >
        <CloseIcon
          color="white"
          transform="scale(0.5)"
          cursor="pointer"
          onClick={handleCloseButtonClick}
          marginInline="calc(100% - 18px)"
          marginTop="-8px"
        />
        <br />
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          marginTop="-2px"
          className="move_toolbar_box"
        >
          <ToolbarButton
            label="Move"
            icon={<FiMove size={25} />}
            backgroundColor={isActive ? "white" : "rgba(255,255,255, 0.5)"}
            color={isActive ? "black" : "#3963c3"}
            onClick={handleClick}
          />
          <ToolbarPointerControl viewerId={viewerId} />
          <Screenshot />
          <MultiView />
        </Flex>
      </Box> */}
    </Flex>
  );
};

export default Move;
