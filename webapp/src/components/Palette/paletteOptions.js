import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Input,
  Text,
  Flex,
  HStack,
  Divider,
  VStack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fabric } from "openseadragon-fabricjs-overlay";
import OpenSeadragon from "openseadragon";
import "../../styles/styles.css";
import {
  updateBasicInfo,
  updateIsVisual,
} from "../../state/reducers/paletteReducer";
import { GiAtom } from "react-icons/gi";
import { SiMaterialdesignicons } from "react-icons/si";
import { CloseIcon } from "@chakra-ui/icons";
import { updateActiveDrawerTool } from "../../state/reducers/drawerReducer";

const PaletteOptions = () => {
  const { isVisual, basicInfo } = useSelector((state) => state.paletteState);
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  // const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");

  const { viewer, fabricOverlay } = useSelector(
    (state) => state.fabricOverlayState
  );
  const dispatch = useDispatch();
  const isActive = activeDrawerTool === "Algorithm";

  useEffect(() => {
    if (!isActive) return;
    analyse();
  }, [isActive]);

  const analyse = async () => {
    // if (password === process.env.REACT_APP_BASIC_PALETTE_PASSWORD) {
    const imgUrl = viewer.world.getItemAt(0).lastDrawn[0].cacheKey;
    //       try {

    const resp = await axios.post("/process", {
      url: imgUrl,
    });
    dispatch(updateBasicInfo(resp.data));

    lockViewer(true);

    // viewport bounds for overlay
    const bounds = viewer.viewport.getBounds(true);

    //create fabric canvas
    const elt = document.createElement("canvas");
    elt.id = "runtime-overlay";
    elt.className = "highlight";
    const runtimeCanvas = new fabric.Canvas(elt);

    // add OSD overlay in viewer
    viewer.addOverlay({
      element: elt,
      location: new OpenSeadragon.Rect(
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height
      ),
      position: OpenSeadragon.Placement.CENTER,
    });

    // add annotation in fabric canvas and render all
    let c = [];
    for (let loc of resp.data["location"]) {
      c.push(
        new fabric.Circle({
          radius: 4,
          fill: "rgba(0,255,0,0.4)",
          stroke: "green",
          strokeWidth: 1.4,
          left: parseFloat(loc[0]),
          top: parseFloat(loc[1]),
        })
      );
    }
    runtimeCanvas.add(...c).renderAll();

    // } catch (err) {
    //   setMessage("Server Not Available");
    // } finally {
    //   setPassword("");
    // }
    // } else {
    //   setMessage("Wrong Password");
    //   canvas.forEachObject((object) => (object.visible = false));
    //   canvas.renderAll();
    //   viewer.setControlsEnabled(false);
    // }
  };

  // to lock the viewer (disable zoom and pan)
  const lockViewer = (lock) => {
    const canvas = fabricOverlay.fabricCanvas();
    if (lock) {
      // hide canvas objects
      canvas.forEachObject((object) => (object.visible = false));
      canvas.renderAll();

      // disable mouse
      viewer.setMouseNavEnabled(false);
    } else {
      // show canvas objects
      canvas.forEachObject((object) => (object.visible = true));
      canvas.renderAll();

      // enable mouse navigation
      viewer.setMouseNavEnabled(true);
    }
  };

  const handleRemove = () => {
    viewer.removeOverlay("runtime-overlay");
    dispatch(updateActiveDrawerTool({ tool: "" }));
    // dispatch(updateIsVisual(false));
    lockViewer(false);
  };

  const PaletteBox = ({ children }) => {
    return (
      <HStack
        w="100%"
        py={2}
        px={1}
        fontSize="xs"
        backgroundColor="#FFFFFF80"
        borderRadius="4px"
        spacing={1}
      >
        {children}
      </HStack>
    );
  };

  // return (
  //   <Flex w="95%" mt="20px" direction="column" align="center">
  //     {!isVisual ? (
  //       <>
  //         <Text fontSize="2xl" color="white">
  //           Analyse this area
  //         </Text>
  //         <Button
  //           mt="8px"
  //           colorScheme="blue"
  //           variant="solid"
  //           mr={3}
  //           onClick={handleClick}
  //         >
  //           Basic Palette
  //         </Button>
  //       </>
  //     ) : (
  //       <Button
  //         mt="8px"
  //         colorScheme="red"
  //         variant="solid"
  //         mr={3}
  //         onClick={handleRemove}
  //       >
  //         Remove Palette
  //       </Button>
  //     )}
  //     {/* {message && (
  //       <Text mt="20px" color="white">
  //         {message}
  //       </Text>
  //     )} */}
  //     {basicInfo && (
  //       <Box mt="15px" w="100%" color="white">
  //         <p>Total nuclei: {basicInfo["total_nuclei"]} </p>
  //         {basicInfo["total_nuclei"] != 0 && (
  //           <>
  //             <p>Minimum radius: {basicInfo["minimum_radius"]} mm</p>
  //             <p>Maximum radius: {basicInfo["maximum_radius"]} mm</p>
  //             <p>
  //               Minimum area: {basicInfo["minimum_area"]} mm<sup>2</sup>
  //             </p>
  //             <p>
  //               Maximum area: {basicInfo["maximum_area"]} mm<sup>2</sup>
  //             </p>
  //             <p>
  //               Average area: {basicInfo["average_area"]} mm<sup>2</sup>
  //             </p>
  //           </>
  //         )}
  //       </Box>
  //     )}
  //   </Flex>
  // );

  return (
    basicInfo && (
      <Box
        w="100%"
        backgroundColor="rgba(255,255,255,0.4)"
        borderRadius="10px"
        pb={4}
        mb={4}
      >
        <HStack justify="flex-end">
          <Text mt={1} color="white" fontSize="sm">
            Analysing the Selection
          </Text>
          <IconButton
            size="xs"
            variant="unstyled"
            icon={
              <CloseIcon size="xs" color="white" _hover={{ color: "red" }} />
            }
            _focus={{ border: "none" }}
            onClick={handleRemove}
          />
        </HStack>
        <Divider bg="white" h="1px" mt={1} mb={4} />
        <VStack mx={2} color="#3965C6" spacing={1}>
          <PaletteBox>
            <GiAtom size={18} />
            <Text>Total Nuclei: {basicInfo["total_nuclei"]}</Text>
          </PaletteBox>
          <PaletteBox>
            <GiAtom size={18} />
            <Text>Minimum Radius: {basicInfo["minimum_radius"]} mm</Text>
          </PaletteBox>
          <PaletteBox>
            <GiAtom size={18} />
            <Text>Maximum Radius: {basicInfo["maximum_radius"]} mm</Text>
          </PaletteBox>
          <PaletteBox>
            <SiMaterialdesignicons color="#3965C698" size={15} />
            <Text>
              Minimun Area: {basicInfo["minimum_area"]} mm<sup>2</sup>
            </Text>
          </PaletteBox>
          <PaletteBox>
            <SiMaterialdesignicons color="#3965C698" size={15} />
            <Text>
              Maximum Area: {basicInfo["minimum_area"]} mm<sup>2</sup>
            </Text>
          </PaletteBox>
          <PaletteBox>
            <SiMaterialdesignicons color="#3965C698" size={15} />
            <Text>
              Average Area: {basicInfo["average_area"]} mm<sup>2</sup>
            </Text>
          </PaletteBox>
        </VStack>
      </Box>
    )
  );
};

export default PaletteOptions;
