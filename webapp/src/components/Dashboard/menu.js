import React, { useState, useEffect } from "react";
import { Link as RouteLink, useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BiTime ,BiHelpCircle} from "react-icons/bi";
import { BsCircleFill ,BsPlusLg} from "react-icons/bs";
// import { IoAdd } from "react-icons/io5";
import {
  AiOutlineFile,
  AiOutlineFolderOpen,
  AiOutlineProject,
} from "react-icons/ai";
import { VscHistory } from "react-icons/vsc";
import { RiArrowRightSLine } from "react-icons/ri";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetUserInfoQuery } from "../../state/api/medicalApi";
import { useDispatch } from "react-redux";
import { getUserId } from "../../hooks/utility";
import projectIcon from '../../images/new-project-images/project-icon.svg';

const DashboardMenu = () => {
  const { user } = useAuth0();
  const { data: userInfo } = useGetUserInfoQuery({
    subClaim: user?.sub,
  });
  const userId = getUserId(user);

  return (
    <Menu
      defaultIsOpen={true}
      closeOnBlur={false}
      closeOnSelect={false}
      autoSelect={false}
    >
      <MenuList
        bg="#ECECEC"
        height="100vh"
        className="dashboard__menu"
        borderRadius="0px"
        border="none"
        color="black"
        position="fixed"
      >
        <Flex>
          <Image
            borderRadius="full"
            boxSize="50px"
            mx={3}
            marginTop="1em"
            src={user?.picture}
            alt="User"
          />
          <Flex marginTop="1em" direction="column" width="9em">
            <Text color="black" className="menu__username">
              {userInfo?.user.firstName + " " + userInfo?.user.lastName}
            </Text>
            <Text  className="menu__email">{userInfo?.user.emailAddress}</Text>
            <Link className="menu__managelink" color="black" marginTop="10px">
              Manage your account
            </Link>
          </Flex>
        </Flex>
        <MenuGroup >
          <MenuDivider marginTop="1em" mx={2} borderColor="#000"/>
          <Link
            as={RouteLink}
            to={`/${userId}/dashboard/recent`}
            _hover={{ textDecoration: "none" }}
          >
            <MenuItem _hover={{ bg: "#F8F8F5" }} name="recent" className="dashboard__menu__list">
              <Icon as={VscHistory} marginRight={2} width="18px" h="18px" />
              Recently viewed
            </MenuItem>
          </Link>
          <Link
            as={RouteLink}
            to={`/${userId}/dashboard/projects`}
            _hover={{ textDecoration: "none" }}
          >
            <MenuItem
              _hover={{ bg: "#F8F8F5" }}
              name="projects"
              className="dashboard__menu__list"
              alignItems="center"
            >
              <Image src={projectIcon} marginRight={2} width="20px" height="20px"   />
              Projects
            </MenuItem>
          </Link>
          <Link
            as={RouteLink}
            to={`/${userId}/dashboard/newProject`}
            _hover={{ textDecoration: "none" }}
            
          >
            <MenuItem
              _hover={{ bg: "#F8F8F5" }}
              name="newProject"
              className="dashboard__menu__list"
              
            >
            
              <Icon as={AiOutlineFile} marginRight={2} w={5} h={7} />
              New project
              <Spacer/>
              <Icon as={RiArrowRightSLine} marginRight={2} w={5} h={4}  />
            </MenuItem>
          </Link>

          <MenuItem _hover={{ bg: "#F8F8F5" }} className="dashboard__menu__list">
            <Icon as={AiOutlineFolderOpen} marginRight={2} w={5} h={7} />
            Open
            <Spacer/>
            <Icon as={RiArrowRightSLine} marginRight={2} w={5} h={4}/>
          </MenuItem>
          <MenuDivider borderColor="#000" m={2} />
          <MenuItem _hover={{ bg: "#F8F8F5" }} className="dashboard__menu__list__username">
            <Icon as={BsCircleFill} marginRight={2} w={4} h={4} color="#7ABCEF" />
            {userInfo?.user.firstName + " " + userInfo?.user.lastName}
          </MenuItem>
          <MenuItem _hover={{ bg: "#F8F8F5" }} className="dashboard__menu__list">
            Team Project
          </MenuItem>
          <MenuDivider m={2} borderColor="#000" />
          <MenuItem _hover={{ bg: "#F8F8F5" }} className="dashboard__menu__list">
            <Icon as={BsPlusLg} marginRight={2} width="14px" height="14px" />
            Create new team
          </MenuItem>
          <MenuItem _hover={{ bg: "#F8F8F5" }} className="dashboard__menu__list">
            <Icon as={BiHelpCircle} marginRight={2} width="18px" height="18px"/>
            Help
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default DashboardMenu;
