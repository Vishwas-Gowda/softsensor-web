/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,Table,Thead,Tr,Th,Tbody,Td
} from "@chakra-ui/react";
import ProjectLink from "../Project/projectLink";
import {
  useGetUserInfoQuery,
  useGetUserOwnedProjectsQuery,
} from "../../state/api/medicalApi";
import "../../styles/dashboard.css";
import Loading from "../Loading/loading";
import {AiOutlineFile} from 'react-icons/ai';
import { Link as RouteLink } from "react-router-dom";
import { getUserId } from "../../hooks/utility";
const Projectlist = () => {
  const { user } = useAuth0();
  const { data } = useGetUserInfoQuery({
    subClaim: user?.sub,
  });
  const userId = getUserId(user);

  const { data: projects, isLoading } = useGetUserOwnedProjectsQuery({
    subClaim: user?.sub,
  });
  return (
    <Flex
      backgroundColor="#F3F3F3"
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
          <HStack
          borderBottom=" 0.5px solid #000"
          >
            <Text
              color="#000"
              fontWeight="500"
              borderColor="#000"
              paddingBottom="10px"
              fontSize="20px"
              fontFamily="roboto"
            >
              Projects
            </Text>
            <Spacer />
            <Link
            as={RouteLink}
            to={`/${userId}/dashboard/projects`}
            _hover={{ textDecoration: "none" }}
            fontSize="14px" color="#000" 
            fontFamily="roboto" marginBottom="0px" 
            borderBottom=" 0.3px solid #000"
          >View all</Link>
          </HStack>
          <Box overflow="auto">
            <Table
              variant="unstyled"
              marginTop="10px"
            >
              <Thead  >
                <Tr color="#000">
                  <Th  px="0px"  fontSize="14px" fontFamily="roboto" fontWeight="400" textTransform="none">Project Name</Th>
                  <Th   fontSize="14px" fontFamily="roboto" fontWeight="400" textTransform="none" >Project Type</Th>
                  <Th     fontSize="14px" fontFamily="roboto" fontWeight="400" textTransform="none"></Th>
                </Tr>
              </Thead>
              <Tbody
              >
                {projects?.filter((projectItem,index)=>index < 5).map((project) => {
                  return (
                    <Tr
                      key={project._id}
                      alignItems="center"
                      justifyContent="center"
                      
                    >
                      <Td px="0px" color="#000" fontWeight="500" fontFamily="roboto" fontSize="16px" alignItems="center" display="flex">
                        <Icon as={AiOutlineFile} marginRight="14px" width="14px" height="14px" />

                        <Text> {project.name}</Text>
                      </Td>
                      <Td color="rgba(0, 0, 0, 0.5)" fontFamily="roboto" fontSize="14px" >
                        {project.type === "singleSlide"
                          ? "Single Slide"
                          : "Multi Slide"}
                      </Td>
                      <Td  p="0px" pt="15px" float="right"  >
                            <Button width= "127px" height= "24px" bgColor="#0784E4" color="#fff" fontFamily="roboto" fontSize="14px" fontWeight="500" ><ProjectLink projectId={project._id} projectName="View Details"/></Button>
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

export default Projectlist;
