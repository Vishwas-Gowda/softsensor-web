import React from "react";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";
import SidebarTools from "../Sidebar/tools";
import { useMediaQuery } from "@chakra-ui/media-query";

const LayoutAppSidebar = ({ children }) => {
  const [ifBiggerScreen] = useMediaQuery("(min-width:1920px)");

  return (
    <Flex
      as="section"
      color="BLACK"
      w={ ifBiggerScreen ? "16%" : "275px"}
      direction="column"
      alignItems="left"
      boxShadow="base"
      zIndex="2"
      backgroundColor="rgba(236, 236, 236, 1)"
      overflowX="auto"
      borderTop="1PX SOLID #000"
      // borderRight="0.5px solid #ffffff"
      // borderBottom="0.5px solid #ffffff"
    >
      <SidebarTools />
    </Flex>
  );
};

LayoutAppSidebar.propTypes = {
  children: PropTypes.node,
};

export default LayoutAppSidebar;
