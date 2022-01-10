/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
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
} from "@chakra-ui/react";
import { BiTime } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { VscHistory } from "react-icons/vsc";
import { IoGridOutline } from "react-icons/io5";
import "react-circular-progressbar/dist/styles.css";
import ProjectLink from "../Project/projectLink";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  useGetUserInfoQuery,
  useGetUserOwnedProjectsQuery,
} from "../../state/api/medicalApi";
import moment from "moment";
import "../../styles/dashboard.css";
import Loading from "../Loading/loading";

const Projects = () => {
  const { user } = useAuth0();
  const [buttonState, setButtonState] = useState(2);
  const { data } = useGetUserInfoQuery({
    subClaim: user?.sub,
  });
  const { data: projects, isLoading } = useGetUserOwnedProjectsQuery({
    subClaim: user?.sub,
  });
  return (
    <Flex
      className="recently__viewed"
      backgroundColor="white"
      borderRadius="5px"
      marginBottom="20px"
      marginTop="20px"
      // width="95%"
      padding="20px"
      paddingBottom="50px"
      direction="column"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HStack>
            <Text
              className="recently__viewed__title"
              color="#3965C5"
              marginLeft="15px"
              marginBottom="20px"
              fontWeight="500"
              borderColor="#3965C5"
              borderBottom="1px"
              paddingBottom="5px"
              fontSize="20px"
              fontFamily="inter"
              // fontSize="2xl"
            >
              Projects
            </Text>
            <Spacer />
            <IconButton
              variant="outline"
              onClick={() => setButtonState(1)}
              icon={<IoGridOutline />}
              size="18px"
              p={0.5}
              colorScheme={buttonState === 1 ? "blue" : "black"}
              borderRadius="8px"
            />
            <IconButton
              variant="outline"
              onClick={() => setButtonState(2)}
              icon={<BsList />}
              size="18px"
              p={0.5}
              colorScheme={buttonState === 2 ? "blue" : "black"}
              borderRadius="8px"
            />
          </HStack>
          <Box overflowX="auto">
            <Table variant="unstyled" marginTop="0px">
              <Thead>
                <Tr>
                  <Th
                    color="#8aaeff"
                    fontSize="14px"
                    fontFamily="inter"
                    fontWeight="400"
                    textTransform="none"
                  >
                    File Name
                  </Th>
                  <Th
                    color="#8aaeff"
                    fontSize="14px"
                    fontFamily="inter"
                    fontWeight="400"
                    textTransform="none"
                  >
                    Last Viewed
                  </Th>
                  <Th
                    color="#8aaeff"
                    fontSize="14px"
                    fontFamily="inter"
                    fontWeight="400"
                    textTransform="none"
                  >
                    Project Owner
                  </Th>
                  <Th
                    color="#8aaeff"
                    fontSize="14px"
                    fontFamily="inter"
                    fontWeight="400"
                    textTransform="none"
                  >
                    Project Type
                  </Th>
                  <Th
                    color="#8aaeff"
                    isNumeric
                    fontSize="14px"
                    fontFamily="inter"
                    fontWeight="400"
                    textTransform="none"
                  >
                    Progress
                  </Th>
                </Tr>
              </Thead>
              <Tbody
              // size="sm"
              // className="recently__viewed__table"
              // alignItems="center"
              >
                {projects?.map((project) => {
                  return (
                    <Tr
                      borderBottom="1px solid #3965C5"
                      _hover={{ bg: "#bacfff" }}
                      key={project._id}
                    >
                      <Td
                        color="#3965C5"
                        fontWeight="500"
                        fontFamily="inter"
                        fontSize="16px"
                        alignItems="center"
                        display="flex"
                      >
                        <Icon
                          as={VscHistory}
                          marginRight="14px"
                          width="14px"
                          height="14px"
                        />
                        <ProjectLink
                          projectName={project.name}
                          projectId={project._id}
                        />
                      </Td>
                      <Td color="#8aaeff" fontFamily="inter" fontSize="14px">
                        {moment(project.lastUpdated).fromNow()}
                      </Td>
                      <Td color="#8aaeff" fontSize="14px" fontFamily="inter">
                        {data?.user.firstName + " " + data?.user.lastName}
                      </Td>
                      <Td color="#8aaeff" fontFamily="inter" fontSize="14px">
                        {/* <Stack direction="row" style={{ width: "120px" }} justify="end">
                                    <CircularProgressbar value="75" text="75%" styles={buildStyles({ textSize: '30px', pathColor: '#fe740d', textColor: '#fe740d' })} />
                                    <CircularProgressbar value="85" text="85%" styles={buildStyles({ textSize: '30px', pathColor: '#67818d', textColor: '#67818d' })} />
                                    <CircularProgressbar value="50" text="50%" styles={buildStyles({ textSize: '30px', pathColor: '#9efadb', textColor: '#9efadb' })} />
                                </Stack> */}
                        {project.type === "singleSlide"
                          ? "Single Slide"
                          : "Multi Slide"}
                      </Td>
                      {/* <Td isNumeric>
                                <Stack direction="row" justify="end">
                                    <Avatar name="Zoe Margot" size="sm" />
                                    <Avatar name="Rakesh Gautam" size="sm" />
                                    <Avatar name="Mila Maghudiya" size="sm" />
                                </Stack>
                            </Td> */}
                      <Td>
                        <ProgressBar
                          // className="dashboard_progressbar"
                          completed={project.totalResponses}
                          maxCompleted={
                            project.cases.length * (project.members.length + 1)
                          }
                          customLabel={`${project.totalResponses}/${
                            project.cases.length * (project.members.length + 1)
                          }`}
                          isLabelVisible={project.totalResponses > 0}
                          bgColor="darkblue"
                          baseBgColor="#66a3ff"
                          labelSize="12px"
                          width="162px"
                          height="24px"
                          className="dashboard__project__progressbar"
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Projects;
