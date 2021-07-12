import React, { memo } from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useWindowHeight } from "@react-hook/window-size";
import { isMobile, isTablet } from "react-device-detect";

const ToolbarButton = ({
  label = "Toolbar button",
  isActive,
  ...restProps
}) => {
  const windowHeight = useWindowHeight();

  let iconSizes = { size: "lg", fontSize: "2xl" };

  if (!isMobile) {
    if (windowHeight <= 645) {
      iconSizes.size = "sm";
      iconSizes.fontSize = "md";
    } else if (windowHeight <= 693) {
      iconSizes.size = "sm";
      iconSizes.fontSize = "md";
    }
  }

  if (isMobile && !isTablet) {
    iconSizes.size = "sm";
    iconSizes.fontSize = "md";
  }

  return (
    <Tooltip
      label={label}
      aria-label={label}
      placement="right-end"
      openDelay={500}
    >
      <IconButton
        size={iconSizes.size}
        fontSize={iconSizes.fontSize}
        variant={isActive ? "outline" : "ghost"}
        _hover={{
          background: "#ddd",
          color: "#000",
        }}
        _focus={{
          borderColor: "none",
        }}
        textTransform="capitalize"
        {...restProps}
      />
    </Tooltip>
  );
};

ToolbarButton.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
};

export default memo(ToolbarButton);
