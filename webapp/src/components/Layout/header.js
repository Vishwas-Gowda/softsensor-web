import React, { useState } from "react";
import { Box, Button, Flex, HStack, Link, IconButton,Text, Icon, Spacer,Image } from "@chakra-ui/react";
import {GrHomeRounded } from "react-icons/gr";
import {IoIosArrowDown } from "react-icons/io";
import { VscBell  } from "react-icons/vsc";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { useGetUserInfoQuery } from "../../state/api/medicalApi";
import ImageGalleryModal from "../imageGalleryModal";
import AltButton from "../altButton";
// import SlideInfo from "../Info/info";
// import SlideFeed from "../Feed/feed";
// import Palette from "../Palette/palette";
// import Download from "../Download/download";
// import Files from "../Files/files";
import "../../styles/viewer.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserId } from "../../hooks/utility";

const LayoutHeader = () => {
  const { user } = useAuth0();
  const { data: userInfo } = useGetUserInfoQuery({
    subClaim: user?.sub,
  });
  const history = useHistory();
  // const fontSizes = ["xs", "sm", "md"];
  const [_channelName, setChannelName] = useState("");

  const inputChannelName = (e) => {
    setChannelName(e.target.value);
  };

  const handleClick = () => {
    const id = getUserId(user);
    history.replace(`/${id}/dashboard/projects`);
  };

  return (
    <div >
      <Flex className="bg-dark" as="header" background="#ECECEC" height="52px" fontWeight="500" border="none" fontSize="14px" fontFamily="inter">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          zIndex="1"
        >
          <HStack alignItems="center" color="#151C25">
            <IconButton
              icon={<GrHomeRounded size={18}/>}
              backgroundColor="#ECECEC"
              _hover={{ bg: "#ECECEC" }}
              onClick={handleClick}
              // color="#fff"
              ml="15px"
            />
            <Link className="header__nav">File</Link>
            <Link className="header__nav">View</Link>
            <Link className="header__nav">Tools</Link>
            <Link className="header__nav">Help</Link>
          </HStack>
          
        </Flex>
        <Spacer />
          <HStack alignItems="center">
            <Flex  alignItems="center" bgColor="#fff" height="32px" minWidth="159px"  mr="30px" border="1px solid #151C25">
              <Text color="#151C25" p="0px 30px 0px 11px" >Viewer Type</Text>
              <Icon as={IoIosArrowDown } color="#151C25" mr="20px"/>
            </Flex>
            <Flex alignItems="center">
              <Icon as={VscBell} width="18px" height="18px" color="#151C25"/>
              <Image
              borderRadius="full"
              mx={3}
              boxSize="30px"
              src={user?.picture}
              alt="User"
              />
              <Text color="#151C25" mr="18px">
                {userInfo?.user.firstName + " " + userInfo?.user.lastName}
              </Text>
            </Flex>
          </HStack>
      </Flex>
    </div>
  );
};

export default LayoutHeader;
