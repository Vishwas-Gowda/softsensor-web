import React from "react";
import PropTypes from "prop-types";
import { ChatIcon } from "@chakra-ui/icons";
import { BiCommentDetail } from "react-icons/bi";
import ToolbarButton from "../ViewerToolbar/button";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveDrawerTool } from "../../state/reducers/drawerReducer";
import TypeButton from "../typeButton";
import { useDisclosure } from "@chakra-ui/hooks";
import MessageBox from "./messageBox";

const SlideChat = () => {
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const isActive = activeDrawerTool === "CHAT";
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToolbarClick = () => {
    dispatch(updateActiveDrawerTool({ tool: isActive ? "" : "CHAT" }));
    onOpen();
  };

  const close = () => {
    onClose();
    dispatch(updateActiveDrawerTool({ tool: isActive ? "" : "CHAT" }));
  };

  return (
    <>
      <TypeButton
        onClick={handleToolbarClick}
        icon={<BiCommentDetail color="black" />}
        backgroundColor={isActive ? "white" : "rgba(236, 236, 236, 1)"}
        border="0.5px solid rgba(21, 28, 37, 1)"
        label="Chat"
        title="Chat"
        transform="scale(1.2)"
      />
      <MessageBox isOpen={isOpen} onClose={close} />
    </>
  );
};

export default SlideChat;
