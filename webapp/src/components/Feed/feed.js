import React from "react";
import PropTypes from "prop-types";
import { FaClipboardList } from "react-icons/fa";
import ToolbarButton from "../ViewerToolbar/button";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveDrawerTool } from "../../state/reducers/drawerReducer";

const SlideFeed = () => {
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const isActive = activeDrawerTool === "FEED";
  const dispatch = useDispatch();

  const handleToolbarClick = () => {
    dispatch(updateActiveDrawerTool({ tool: isActive ? "" : "FEED" }));
  };

  return (
    <ToolbarButton
      onClick={handleToolbarClick}
      icon={<FaClipboardList />}
      label="Feed"
      color={isActive ? "white" : "#999999"}
    />
  );
};

export default SlideFeed;
