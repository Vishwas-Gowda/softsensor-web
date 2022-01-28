import React from "react";
import ToolbarButton from "../ViewerToolbar/button";
import {BiScreenshot} from 'react-icons/bi';
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";

const Screenshot = () => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);

  const handleClick = () => {};

  return (
    <ToolbarButton
      label="Screenshot"
      icon={<BiScreenshot size={18} color='#151C25' />}
      // backgroundColor="rgba(255,255,255, 0.5)"
      // color="#3963c3"
      // _hover={{
      //   backgroundColor: "white",
      //   color: "black",
      // }}
      // _focus={{}}
      onClick={handleClick}
    />
  );
};

export default Screenshot;
