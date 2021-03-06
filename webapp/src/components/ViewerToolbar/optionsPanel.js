import React from "react";
import PropTypes from "prop-types";
import { Box, useColorModeValue } from "@chakra-ui/react";

const ToolbarOptionsPanel = ({ children }) => {
  const bg = useColorModeValue("white", "gray.700");

  return (
    <Box
      backgroundColor={bg}
      position="absolute"
      top="3"
      left={["16", "24"]}
      p={[1, 2]}
      boxShadow="xl"
    >
      {children}
    </Box>
  );
};

ToolbarOptionsPanel.propTypes = {
  children: PropTypes.node,
};

export default ToolbarOptionsPanel;
