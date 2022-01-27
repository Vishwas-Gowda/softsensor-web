import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Icon,
    Text,
    HStack,
    Flex,
    Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Spacer
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import ProgressBar from "@ramonak/react-progress-bar";
import ProjectLink from "../Project/projectLink";
import { useGetUserInfoQuery,
    useGetUserOwnedProjectsQuery,
} from "../../state/api/medicalApi";
import { useGetLastTaskQuery } from "../../state/api/medicalApi";
import { getSlideUrl } from "../../hooks/utility";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useLocation,useHistory } from "react-router-dom";
import Loading from "../Loading/loading";

const StudyAction = () => {
    const { user } = useAuth0();
    const history = useHistory();
    const { projectId, caseId } = history.location?.state;
    const { data } = useGetUserInfoQuery({
        subClaim: user?.sub,
      });
    const { data: projects, isLoading } = useGetUserOwnedProjectsQuery({
        subClaim: user?.sub,
      });
    // const currentCaseIndex = project?.cases.findIndex(
    //   (projectCase) => projectCase._id === caseId
    // );
    return (
        < >
            {isLoading ? (
                <Loading />
                ) : (
            <Box backgroundColor="#ECECEC" p="0px"  >
                <VStack alignItems="flex-start" ml="16px">
                    <HStack   fontFamily="roboto" fontSize="14px" mt="20px" mb="10px">
                        <Text  >Projects</Text>
                        <Icon as={MdOutlineKeyboardArrowRight}/>
                        <Text fontWeight="500" >Projects titles</Text>
                    </HStack>
                    <Box overflow="auto" minW="95%" >
                        
                        {projects?.map((project) => {
                        return (
                            <>
                            <HStack py="10px" px="5px" minW="100%" borderBottom="1px solid #000" _hover={{ bg: "#F8F8F5" }}>
                            <Text fontFamily="roboto" fontSize="14px">
                                {project.name}
                            </Text>
                               <Spacer />
                               <ProgressBar
                                    completed={project.totalResponses}
                                    maxCompleted={
                                        project.cases.length * (project.members.length + 1)
                                    }
                                    customLabel={`${project.totalResponses}/${
                                        project.cases.length * (project.members.length + 1)
                                    }`}
                                    isLabelVisible={project.totalResponses > 0}
                                    bgColor="#0784E4"
                                    baseBgColor="#7ABCEF"
                                    labelSize="12px"
                                    width="162px"
                                    height="24px"
                                    className="dashboard__project__progressbar"
                                    />
                                </HStack>
                            </>
                        );
                        })}
                    
                    </Box>
                </VStack>
            </Box>
            )}
        </>

        // <Accordion defaultIndex={[0]} allowMultiple marginLeft="0px">
        //     <AccordionItem border="0px" variant="unstyled" marginTop="0px">
        //         <AccordionButton size="sm" _focus={{ border: "none" }} paddingLeft="0px">
        //             <AccordionIcon />
        //             <Icon as={AiOutlineProject} mr={1} ml={2} w={5} h={4} />
        //             <Box flex="1" textAlign="left" fontSize="xs">
        //                 New Assigned Tasks
        //             </Box>
        //         </AccordionButton>
        //         <AccordionPanel padding="0px">
        //             <Accordion defaultIndex={[0]} allowMultiple>
        //                 <AccordionItem border="0px" variant="unstyled">
        //                     <AccordionButton size="sm" _focus={{ border: "none" }} paddingLeft="1em">
        //                         <AccordionIcon />
        //                         <Icon as={AiOutlineProject} mr={1} ml={2} w={5} h={4} />
        //                         <Box flex="1" textAlign="left" fontSize="xs">
        //                             Project - 1
        //                         </Box>
        //                     </AccordionButton>
        //                     <AccordionPanel padding="0px">
        //                         <Text fontSize="sm" ml="3.5em">Project-1 Tasks here</Text>
        //                     </AccordionPanel>
        //                 </AccordionItem>
        //                 <AccordionItem border="0px" variant="unstyled">
        //                     <AccordionButton size="sm" _focus={{ border: "none" }} paddingLeft="1em">
        //                         <AccordionIcon />
        //                         <Icon as={AiOutlineProject} mr={1} ml={2} w={5} h={4} />
        //                         <Box flex="1" textAlign="left" fontSize="xs">
        //                             Project - 2
        //                         </Box>
        //                     </AccordionButton>
        //                     <AccordionPanel padding="0px">
        //                         <Text fontSize="sm" ml="3.5em">Project-2 Tasks here</Text>
        //                     </AccordionPanel>
        //                 </AccordionItem>
        //             </Accordion>
        //         </AccordionPanel>
        //     </AccordionItem>
        // </Accordion>
    );
};

export default StudyAction;