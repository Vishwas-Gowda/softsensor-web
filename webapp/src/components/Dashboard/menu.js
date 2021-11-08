import React, { useState, useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";
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
  Text,
} from "@chakra-ui/react";
import { BiTime } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import {
  AiOutlineFile,
  AiOutlineFolderOpen,
  AiOutlineProject,
} from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import LogoutButton from "../Authenticate/logout";
import Newproject from "../Newproject/newproject";

const DashboardMenu = ({ handleActiveOption }) => {
  const { user, isAuthenticated } = useAuth0();
  const [emailId, setEmailId] = useState();
  const [userImage, setUserImage] = useState();
  const [newProjectScreen, setNewProjectScreen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setEmailId(user?.email);
      setUserImage(user?.picture);
    }
  }, [isAuthenticated]);

  const breakpoints = createBreakpoints({
    sm: "1280px",
    md: "1440px",
    lg: "1920px",
    xl: "2560px",
  });

  return (
    <Menu
      defaultIsOpen={true}
      closeOnBlur={false}
      closeOnSelect={false}
      autoSelect={false}
    >
      <MenuList
        bg="#3965C6"
        height="100vh"
        className="dashboard__menu"
        borderRadius="0px"
        border="none"
        color="white"
        position="fixed"
      >
        <Flex>
          <Image
            borderRadius="full"
            boxSize="50px"
            mx={3}
            marginTop="1em"
            src={userImage}
            alt="User"
          />
          <Flex marginTop="1em" direction="column" width="9em">
            <Text color="white">User's Name</Text>
            <Text fontSize="xs">{emailId}</Text>
            <Link fontSize="small" color="white" marginTop="10px">
              Manage your Account
            </Link>
          </Flex>
        </Flex>
        <MenuGroup>
          <MenuDivider marginTop="1em" mx={2} />
          <MenuItem
            _hover={{ bg: "#66a3ff" }}
            fontSize="small"
            name="recent"
            onClick={(e) => handleActiveOption(e)}
          >
            <Icon as={BiTime} marginRight={2} w={5} h={7} />
            Recently Viewed
          </MenuItem>
          <MenuItem
            _hover={{ bg: "#66a3ff" }}
            fontSize="small"
            name="projects"
            onClick={(e) => handleActiveOption(e)}
          >
            <Icon as={AiOutlineProject} marginRight={2} w={5} h={7} />
            Projects
          </MenuItem>
          <MenuItem
            _hover={{ bg: "#66a3ff" }}
            fontSize="small"
            name="newProject"
            onClick={(e) => handleActiveOption(e)}
          >
            <Icon as={AiOutlineFile} marginRight={2} w={5} h={7} />
            New Projects
          </MenuItem>
          <MenuItem _hover={{ bg: "#66a3ff" }} fontSize="small">
            <Icon as={AiOutlineFolderOpen} marginRight={2} w={5} h={7} />
            Open
          </MenuItem>
          <MenuDivider m={2} />
          <MenuItem _hover={{ bg: "#66a3ff" }} fontWeight="bold">
            <Icon as={BsCircleFill} marginRight={2} w={4} h={4} />
            User's Name
          </MenuItem>
          <MenuItem _hover={{ bg: "#66a3ff" }} fontSize="small">
            Team Project
          </MenuItem>
          <MenuDivider m={2} />
          <MenuItem _hover={{ bg: "#66a3ff" }} fontSize="small">
            <Icon as={IoAdd} marginRight={2} w={5} h={7} />
            Create New Team
          </MenuItem>
          <MenuItem _hover={{ bg: "#66a3ff" }} fontSize="small">
            <Icon as={BsCircleFill} marginRight={2} w={4} h={4} />
            Help
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default DashboardMenu;
