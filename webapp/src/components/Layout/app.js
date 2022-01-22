import React, { useEffect, useState } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import AdjustmentBar from "../AdjustmentBar/adjustmentBar";
import Toolbar from "../ViewerToolbar/toolbar";
import ViewerContainer from "../Viewer/container";
import ExtendibleDrawer from "./extdrawer";
import LayoutHeader from "./header";
import LayoutAppBody from "./body";
import LayoutInnerBody from "./innerbody";
import LayoutOuterBody from "./outerbody";
import LayoutAppFooter from "./footer";
import ViewerToolbar from "./viewertoolbar";
import LayoutAppSidebar from "./sidebar";
import Div100vh from "react-div-100vh";
import useKeyboardEvents from "../../hooks/use-keyboard-events";
import { fabric } from "openseadragon-fabricjs-overlay";
import ViewerFactory from "../Viewer/viewerFactory";
import { resetFabricOverlay } from "../../state/reducers/fabricOverlayReducer";
import { useAuth0 } from "@auth0/auth0-react";
import { useUpdateLastTaskMutation } from "../../state/api/medicalApi";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { resetViewerIds } from "../../state/reducers/viewerReducer";
import "../../styles/viewer.css";
import Files from "../Files/files";
import { resetResponse } from "../../state/reducers/slideQnaReducer";

const LayoutApp = () => {
  // const { handleEvent } = useKeyboardEvents();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const location = useLocation();
  const [updateLastTask] = useUpdateLastTaskMutation();

  useEffect(() => {
    return () => {
      dispatch(resetViewerIds());
      dispatch(resetFabricOverlay());
      dispatch(resetResponse());
      updateLastTask({
        subClaim: user?.sub,
        caseId: location?.state.caseId,
      });
    };
  }, []);

  const [sidebar, setSidebar] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const showNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <Flex as={Div100vh} h="100vh" direction="column">
      <LayoutOuterBody>
        <LayoutHeader />
        <Files dropDownToggle={setDropDownOpen} dropDownVar={dropDownOpen} />
        {navbar ? (
          <>
            <ChevronUpIcon
              onClick={showNavbar}
              // color="white"
              className="close_button_navbar"
            />
            <AdjustmentBar
              dropDownOpen={dropDownOpen}
              setDropDownOpen={setDropDownOpen}
            />
          </>
        ) : (
          <Button
            pos="fixed"
            zIndex={3}
            right={0}
            backgroundColor="rgba(248, 248, 245, 1)"
            title="Show Navbar"
            onClick={showNavbar}
          >
            {<ChevronDownIcon color="#000" fontWeight="bold" />}
          </Button>
        )}
        <LayoutInnerBody>
          {sidebar ? (
            <>
              <ChevronLeftIcon
                pos="fixed"
                onClick={showSidebar}
                style={{ cursor: "pointer" }}
                zIndex={3}
                left="18%"
                height="100vh"
                color="BLACK"
                backgroundColor="rgba(236, 236, 236, 1)"
                padding="1px 1px 1px 1px"
                mt="1px"
                // borderLeft="0.1px solid white"
              />

              <LayoutAppSidebar />
            </>
          ) : (
            <ChevronRightIcon
              pos="fixed"
              onClick={showSidebar}
              style={{ cursor: "pointer" }}
              zIndex={3}
              height="100vh"
              color="BLACK"
              backgroundColor="rgba(236, 236, 236, 1)"
              padding="1px 1px 1px 1px"
              // borderLeft="0.1px solid white"
            />
          )}
          <LayoutAppBody>
            <ViewerFactory />
          </LayoutAppBody>
        </LayoutInnerBody>
      </LayoutOuterBody>
    </Flex>
  );
};

export default LayoutApp;
