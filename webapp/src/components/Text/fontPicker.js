import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Link,
  Heading,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import FontFaceObserver from "fontfaceobserver";

export const fonts = [
  {
    id: "reenieBeanie",
    fontFamily: "Reenie Beanie",
  },
  {
    id: "courierPrime",
    fontFamily: "Courier Prime",
  },
  {
    id: "openSans",
    fontFamily: "Open Sans",
  },
];

const TypeTextFontPicker = ({ handleFontChange }) => {
  const { fabricOverlay } = useSelector((state) => state.fabricOverlayState);
  const { activeFont } = useSelector((state) => state.textState);

  const activeClasses = {
    borderColor: useColorModeValue("gray.300", "white"),
    borderWidth: "2px",
  };

  const handleFontClick = (font) => {
    handleFontChange(font);
  };

  const loadAndUse = (font) => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
      return;
    }

    var myfont = new FontFaceObserver(font);
    myfont
      .load()
      .then(function () {
        // when font is loaded, use it.
        canvas.getActiveObject().set("fontFamily", font);
        canvas.requestRenderAll();
      })
      .catch(function (e) {
        console.error(e);
      });
  };

  return (
    <>
      <Heading as="h2" size="sm" mb={3}>
        Text
      </Heading>
      <VStack spacing={3}>
        <Wrap direction="column" justify="flex-start">
          {fonts.map((font) => (
            <WrapItem key={font.id}>
              <Link
                fontFamily={font.fontFamily}
                id={font.id}
                onClick={() => handleFontClick(font)}
                fontSize="24px"
                w="250px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                borderWidth="1px"
                p={3}
                borderRadius={8}
                {...(activeFont &&
                  activeFont.id === font.id && { ...activeClasses })}
              >
                {font.fontFamily}
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </>
  );
};

TypeTextFontPicker.propTypes = {
  handleFontChange: PropTypes.func,
};

export default TypeTextFontPicker;
