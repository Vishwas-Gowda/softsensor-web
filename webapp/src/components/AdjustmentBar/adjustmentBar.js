import React, { memo, useState } from "react";
import { Box, Flex, VStack, Collapse, Text } from "@chakra-ui/react";
import Color from "../Color/color";
import ImageGalleryModal from "../imageGalleryModal";
import { useSelector } from "react-redux";
import SlideUser from "../UserSettings/user";
import Move from "../Move/move";
import Case from "../Case/case";
import ShareLink from "../Share/shareLink";
import Algorithm from "../Palette/algorithm";
import TypeTools from "./typeTools";
import MultiView from "../MultiView/multiView";
import GenerateReport from "../Report/generateReport";
import ChangeCase from "../Case/changeCase";
import "../../styles/viewer.css";

const AdjustmentBar = ({ dropDownOpen }) => {
  const { roomName, guestList } = useSelector((state) => state.socketState);
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const { currentViewer } = useSelector((state) => state.viewerState);
  const viewerId = "viewer1";
  const bg = "#3965C3";
  const [caseToggle, setCaseToggle] = useState(true);
  const [algoToggle, setAlgoToggle] = useState(true);
  const [toolsToggle, setToolsToggle] = useState(true);
  const [colorsToggle, setColorsToggle] = useState(true);
  const [shareGenToggle, setShareGenToggle] = useState(true);
  const [typeToolsToggle, setTypeToolsToggle] = useState(true);

  return (
    <Box className="adjustmentbar" height="6em" borderTop="1px solid #000">
      <Flex bgColor="rgba(236, 236, 236, 1)" alignItems="center" borderBottom="1px solid #ffffff50">
        {caseToggle ? <Case changeCount={setCaseToggle} /> : ""}
        {algoToggle ? (
          <Box
            width="100%"
            height="6em"
            borderRight="0.5px solid black"
            boxSizing="border-box"
            zIndex={4}
          >
            <Flex direction="column" marginTop="5px" marginLeft="5px">
              {/* <ImageGalleryModal
                viewerId={currentViewer}
                closeToggle={setAlgoToggle}
              /> */}
              <ChangeCase closeToggle={setAlgoToggle} />
            </Flex>
          </Box>
        ) : (
          ""
        )}
        {toolsToggle ? (
          <Move viewerId={currentViewer} toolsButtonHandler={setToolsToggle} />
        ) : (
          ""
        )}
        {colorsToggle ? (
          <Color
            viewerId={currentViewer}
            colorsButtonHandler={setColorsToggle}
          />
        ) : (
          ""
        )}
        {typeToolsToggle ? (
          <TypeTools
            viewerId={currentViewer}
            typeToolsButtonHandler={setTypeToolsToggle}
          />
        ) : (
          ""
        )}
        {shareGenToggle ? (
          <SlideUser closeButtonToggle={setShareGenToggle} />
        ) : (
          ""
        )}
        <Collapse in={dropDownOpen} animateOpacity style={{ zIndex: "10" }}>
          <Box
            pos="fixed"
            top="40px"
            left="117px"
            background="white"
            color="black"
            borderRadius="5px"
            border="5px solid white"
          >
            <VStack>
              <Text
                onClick={() => setCaseToggle(true)}
                className="file_menu_option"
              >
                Case Information
              </Text>
              <Text
                onClick={() => setAlgoToggle(true)}
                className="file_menu_option"
              >
                Choose slides and algorithms
              </Text>
              <Text
                onClick={() => setColorsToggle(true)}
                className="file_menu_option"
              >
                Colors, Width
              </Text>
              <Text
                onClick={() => setTypeToolsToggle(true)}
                className="file_menu_option"
              >
                Type of tools
              </Text>
              <Text
                onClick={() => setToolsToggle(true)}
                className="file_menu_option"
              >
                Toolbar controls
              </Text>
              <Text
                onClick={() => setShareGenToggle(true)}
                className="file_menu_option"
              >
                Share and generate report
              </Text>
            </VStack>
          </Box>
        </Collapse>
      </Flex>
    </Box>
  );
};

export default memo(AdjustmentBar);
