import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  VStack,
  Icon,
  IconButton,
  Link,
  Spacer,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";
import DashboardMenu from "../Dashboard/menu";
import Search from "../Dashboard/search";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { AiOutlineProject } from "react-icons/ai";
import { BsList, BsCircleFill } from "react-icons/bs";
import { IoGridOutline, IoAdd } from "react-icons/io5";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Header from "../Dashboard/header";
import TasksAssigned from "./tasksAssigned";
import TasksSubmitted from "./tasksSubmitted";
import TasksCompleted from "./tasksCompleted";
import TeamInfo from "./teamInfo";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetProjectInfoQuery,
  useUpdateLastViewedMutation,
} from "../../state/api/medicalApi";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { getAccessToken } from "../../hooks/utility";
import Loading from "../Loading/loading";
import { useDispatch } from "react-redux";
import useUserAuthentication from "../../hooks/useUserAuthentication";
import "../../styles/dashboard.css";


const Project = ({displayAvatarColumn}) => {
  const { user } = useAuth0();
  const location = useLocation();
  const { data: project, isLoading } = useGetProjectInfoQuery({
    subClaim: user?.sub,
    projectId: location.state.projectId,
  });
  const [updateLastViewed] = useUpdateLastViewedMutation();
  const isUserAuthenticated = useUserAuthentication();

  useEffect(() => {
    if (!project) return;
    return () => {
      updateLastViewed({ subClaim: user?.sub, projectId: project._id });
    };
  }, [project]);

  return !isUserAuthenticated || isLoading ? (
    <Loading />
  ) : (
    <>
      <DashboardMenu />
      <Box
        marginLeft="14em"
        height="100vh"
        direction="column"
        backgroundColor="#ffffff"
      >
        <Header />
        {isLoading ? (
          <Flex justify="center" align="center" h="100vh">
            <Spinner color="#3965C5" size="xl" thickness="4px" speed="0.65s" />
          </Flex>
        ) : (
          <Box className="projects_page">
            <Flex w="100%" direction="row" marginTop="10px" fontFamily="inter" fontWeight="500">
              <Text color="#3965C5" borderBottom="1px solid #3965C5" m={5}>
                Recently Viewed
              </Text>
              <Icon as={MdOutlineKeyboardArrowRight} color="#3965C5" my={6} />
              <Text color="#3965C5" borderBottom="1px solid #3965C5" m={5}>
                {project?.name}
              </Text>
              <Spacer />
              <Search w={200} mr={5} />
              <IconButton
                icon={<IoGridOutline color="#3965C5" />}
                size="xs"
                border="1px solid #3965C5"
                marginRight={3}
                marginTop={4}
              />
              <IconButton
                icon={<BsList color="#3965C5" />}
                size="xs"
                border="1px solid #3965C5"
                marginRight={5}
                marginTop={4}
              />
            </Flex>
            <Flex direction="column">
              <Flex>
                <Text
                  fontSize="32px"
                  fontWeight="500"
                  fontFamily="roboto"
                  color="#3965C5"
                  mx={9}
                  my={2}
                >
                  {project?.name}
                </Text>
                <Spacer />
                <Button
                  // size="md"
                  // px={10}
                  fontFamily="roboto"
                  fontWeight="500"
                  w="241px"
                  h="40px"
                  border="1px solid blue"
                  color="#3965C5"
                >
                  Project Details
                </Button>
                <Button
                  // size="md"
                  // px={10}
                  fontFamily="roboto"
                  fontWeight="500"
                  mx={4}
                  w="241px"
                  h="40px"
                  backgroundColor="#3965C5"
                  color="white"
                  _hover={{ bg: "#66a3ff" }}
                >
                  View Reports
                </Button>
              </Flex>
              <HStack fontFamily="inter" fontWeight="500">
                <Text color="#8aaeff"  marginLeft={9}>
                  {moment(project?.lastUpdated).format("DD MMM, YYYY")}
                  <Icon as={BsCircleFill} marginBottom={1} mx={2} w={1} h={1} />
                </Text>
                <Text color="#8aaeff"  mx={0}>
                  {`Created by ${project?.owner.firstName} ${project?.owner.lastName}`}
                </Text>
              </HStack>
              <Flex>
                <TasksAssigned
                  owner={project?.owner}
                  members={project?.members}
                  progress={project?.projectProgress}
                  tasks={project?.cases}
                  projectType={project?.type}
                  questionnaire={project?.questionnaire}
                  displayAvatarColumn={displayAvatarColumn}
                />
                <Spacer />
                <TeamInfo
                  members={project?.members}
                  projectOwner={project?.owner}
                  projectProgress={project?.projectProgress}
                  totalTasks={project?.cases.length}
                />
              </Flex>
              {/* <TasksSubmitted ownerId={project?.owner.subClaim} />
              <TasksCompleted ownerId={project?.owner.subClaim} /> */}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Project;
