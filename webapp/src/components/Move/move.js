import { React } from "react";
import { FiMove } from "react-icons/fi";
import ToolbarButton from "../ViewerToolbar/button";
import Screenshot from "../Screenshot/screenshot";
import MultiView from "../MultiView/multiView";
import ToolbarPointerControl from "../ViewerToolbar/pointerControl";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Move = ({ viewerId, toolsButtonHandler }) => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);
  const isActive = activeTool === "Move";
  const dispatch = useDispatch();
  const [closeButton, setCloseButton] = useState(true);
  const handleCloseButtonClick = () => {
    setCloseButton(false);
    toolsButtonHandler(false);
  };

  const handleClick = () => {
    dispatch(updateTool({ tool: isActive ? "" : "Move" }));
  };

  return (
    <>
      <Box
        width="100%"
        height="6em"
        borderRight="0.5px solid black"
        boxSizing="border-box"
        borderRadius="3px"
      >
        <CloseIcon
          color="black"
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
          color="#000"
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
      </Box>
    </>
  );
};

export default Move;
