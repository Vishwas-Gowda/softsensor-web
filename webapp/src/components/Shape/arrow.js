import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import TypeButton from "../typeButton";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";

const Arrow = () => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);
  const isActive = activeTool === "Arrow";
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateTool({ tool: isActive ? "" : "Arrow" }));
  };

  return (
    <TypeButton
      pl="0px"
      icon={<BsArrowUpRight size={22} />}
      backgroundColor={isActive ? "#E4E5E8" : ""}
      // color={isActive ? "black" : "#3963c3"}
      borderRadius="0px"
      label="Line"
      onClick={handleClick}
    />
  );
};

export default Arrow;
