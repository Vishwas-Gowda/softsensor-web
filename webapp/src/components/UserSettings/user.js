import React from "react";
import PropTypes from "prop-types";
import { HiUserGroup } from "react-icons/hi";
import ToolbarButton from "../ViewerToolbar/button";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveDrawerTool } from "../../state/reducers/drawerReducer";
import TypeButton from "../typeButton";
import { Box, Flex, HStack } from "@chakra-ui/react";
import SlideChat from "../Chat/chat";
import ShareLink from "../Share/shareLink";
import GenerateReport from "../Report/generateReport";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SlideUser = ({ closeButtonToggle }) => {
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const isActive = activeDrawerTool === "SETTINGS";
  const dispatch = useDispatch();
  const [closeButton, setCloseButton] = useState(true);
  const handleCloseButtonClick = () => {
    setCloseButton(false);
    closeButtonToggle(false);
  };

  const handleToolbarClick = () => {
    dispatch(updateActiveDrawerTool({ tool: isActive ? "" : "SETTINGS" }));
  };

  return (
    <Box
      width="100%"
      height="6em"
      borderRight="0.5px solid black"
      boxSizing="border-box"
      borderRadius="3px"
      paddingLeft="2px"
    >
      <CloseIcon
        color="black"
        transform="scale(0.5)"
        cursor="pointer"
        onClick={handleCloseButtonClick}
        marginInline="calc(100% - 18px)"
        marginTop="-8px"
      />
      <HStack
        marginRight="40px"
        marginLeft="30px"
        mt="10px"
        direction="row"
        spacing={5}
        className="user_toolbar_box"
      >
        <TypeButton
          onClick={handleToolbarClick}
          icon={<HiUserGroup color="white" />}
          label="User Settings"
          backgroundColor="#3963c3"
          border="0.5px solid rgba(255, 255, 255, 0.5)"
          transform="scale(1.5)"
        />
        <SlideChat />
        <GenerateReport />
        <Box></Box>
        <ShareLink />
      </HStack>
    </Box>
  );
};

export default SlideUser;
