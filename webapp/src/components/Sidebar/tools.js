import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Icon,
  Flex
} from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiOutlineFilter} from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import "../../styles/styles.css";
import ActivityFeed from "../Feed/activityFeed";
import PaletteOptions from "../Palette/paletteOptions";
import UserOptions from "../UserSettings/userOptions";
import { updateActiveFeed } from "../../state/reducers/feedReducer";
import Studies from "./studies";
import Annotations from "./annotations";
import Questions from "./questions";
import Analysis from "./analysis";
import "../../styles/viewer.css";

const SidebarTools = () => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const { isMultiView } = useSelector((state) => state.viewerState);
  const { activeFeed } = useSelector((state) => state.feedState);
  const dispatch = useDispatch();

  const SlideToggleButton = ({ label, value, isActive, ...restProps }) => (
    <Box
      as="button"
      p={1}
      my={1}
      fontWeight="bold"
      fontSize={11}
      bgColor={isActive ? "#F7F2F2" : "#DBDBDB70"}
      color={isActive ? "black" : "#D3CFCF"}
      onClick={() => dispatch(updateActiveFeed(value))}
      _disabled={{
        cursor: "not-allowed",
      }}
      {...restProps}
    >
      {label}
    </Box>
  );

  return (
    // <Box w="100%" mt="50px">
    //   <Box
    //     backgroundColor="white"
    //     pl={1}
    //     px={2}
    //     fontSize="sm"
    //   >
    //     <HStack justify="space-between">
    //       {/* <Text> Annotations</Text> */}
    //       {/* <HStack spacing={0}>
    //         <SlideToggleButton
    //           label="Slide 1"
    //           value="viewer1"
    //           isActive={activeFeed === "viewer1"}
    //           borderLeftRadius="5px"
    //         />
    //         <SlideToggleButton
    //           label="Slide 2"
    //           value="viewer2"
    //           isActive={activeFeed === "viewer2"}
    //           disabled={!isMultiView}
    //           borderRightRadius="5px"
    //         />
    //       </HStack> */}
    //     </HStack>
    //   </Box>
    //   <Box
    //     h={activeDrawerTool === "Algorithm" ? "30vh" : "55vh"}
    //     mt="5px"
    //     mb="10px"
    //   >
    //     <ActivityFeed viewerId={activeFeed} />
    //   </Box>
    //   <UserOptions />
    //   {activeDrawerTool === "Algorithm" && <PaletteOptions />}
    // </Box>
    // <HStack backgroundColor="rgba(255,255,255,0.2)">
    //   <Studies />
    //   <Annotations />
    //   <Questions />
    //   <Analysis />
    // </HStack>
    <Box   bgColor="#fff" minwidth="306px" padding="0px" margin="0px">
      <Tabs isFitted size="10px" >
        <TabList backgroundColor="#F8F8F5" fontSize="14px" fontWeight="500" fontFamily="inter" >
          <Tab
            _focus={{ border: "none" }}
            _selected={{ bg: "#E4E5E8",
            borderLeft:"0.5px solid #000000",border:"0.5px solid #000000",borderTop:"none" }}
            // fontSize="xs"
            color="#00153F"
            py={2}
            border="0.5px solid #000"
            borderRight="none"
            borderTop="none"
            fontFamily="inter"
          >
            Studies
          </Tab>
          <Tab
            _focus={{ border: "none" }}
            _selected={{ bg: "#E4E5E8",border:"0.5px solid #000000",borderTop:"none" }}
            // fontSize="xs"
            color="#00153F"
            py={2}
            border="0.5px solid #000"
            borderLeft="none"
            borderTop="none"
            fontFamily="inter"
          >
            Questions
          </Tab>
          {/* <Tab
            _focus={{ border: "none" }}
            _selected={{ bg: "#E4E5E8" ,border:"0.5px solid #000000"}}
            // fontSize="xs"
            color="#00153F"
            py={2}
            border="0.5px solid #000000"
            borderRight="none"
            fontFamily="inter"
          >
            Annotations
          </Tab> */}
          {/* <Tab
            _focus={{ border: "none" }}
            _selected={{ bg: "#3965C5" }}
            fontSize="xs"
            py={2}
            px={1}
          >
            Annotations
          </Tab>

          <Tab
            _focus={{ border: "none" }}
            _selected={{ bg: "#3965C5" }}
            fontSize="xs"
            py={2}
          >
            Analysis
          </Tab> */}
          
        </TabList>
        <Flex flex="1"  alignItems="center" justifyContent="flex-end" borderTop="none" my="10px"  bgColor="#ECECEC" h="32px">
          <Icon as={HiOutlineFilter} size={18} mr="13px"/>
          <Text mr="15px" fontFamily="inter" fontWeight="500" fontSize="14px">Sort by </Text>
        </Flex>
        <TabPanels>
          <TabPanel p="0px">
            <Studies />
          </TabPanel>
          <TabPanel p="0px" mt="-10px">
            <Questions />
          </TabPanel>
          <TabPanel p="0px">
            <Annotations />
          </TabPanel>
          {/* <TabPanel>
            <Analysis />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SidebarTools;
