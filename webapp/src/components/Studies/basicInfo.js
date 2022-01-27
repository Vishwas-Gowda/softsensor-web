import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,HStack,VStack,Icon
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetProjectInfoQuery } from "../../state/api/medicalApi";
import moment from "moment";
import {BsDot} from 'react-icons/bs'
import { useLocation } from "react-router-dom";

const BasicInfo = () => {
  const { user } = useAuth0();
  const location = useLocation();
  const { data: project } = useGetProjectInfoQuery({
    subClaim: user?.sub,
    projectId: location.state.projectId,
  });
  return (
    <>
    <VStack alignItems="flex-start" fontFamily="roboto" fontSize="14px" p="30px 16px 25px 18px" bgColor="#ECECEC">
    <HStack >
    <Text fontWeight="500">{project && project.slideType}</Text>
    <Text fontWeight="500">{project && project.type}</Text>
    </HStack>
    <Text fontSize="16px">{project && project.name}</Text>
    <HStack>
    <Text fontSize="12px"> {project &&  moment(project.createdAt).utcOffset("+05:30").format("MM/DD/YYYY, hh:mm a")} IST</Text>
    <Icon as={BsDot} />
    <Text fontSize="12px">{project && project.owner.firstName} {project && project.owner.lastName}</Text>
    
    </HStack>
    <Text>{project && project.description}</Text>
    </VStack>
    </>
    // <Table variant="unstyled" size="small" color="#000" bgColor="#ECECEC">
    //   <Tbody>
    //     <Tr>
    //       <Td
    //         paddingBottom="5px"
    //         paddingLeft="0px"
    //         fontSize="xs"
    //         fontWeight="bold"
    //       >
    //         Project Title
    //       </Td>
    //       <Td paddingBottom="5px" fontSize="xs" width="50%">
    //         {project && project.name}
    //       </Td>
    //     </Tr>
    //     <Tr>
    //       <Td
    //         paddingBottom="5px"
    //         paddingLeft="0px"
    //         fontSize="xs"
    //         fontWeight="bold"
    //         verticalAlign="top"
    //       >
    //         Description
    //       </Td>
    //       <Td paddingBottom="5px" fontSize="xs">
    //         {project && project.description}
    //       </Td>
    //     </Tr>
    //     <Tr>
    //       <Td
    //         paddingBottom="5px"
    //         paddingLeft="0px"
    //         fontSize="xs"
    //         fontWeight="bold"
    //         verticalAlign="top"
    //       >
    //         Time Created
    //       </Td>
    //       <Td paddingBottom="5px" fontSize="xs">
    //         {project &&
    //           moment(project.lastUpdated).format("MMM Do YYYY, h:mm:ss a")}
    //       </Td>
    //     </Tr>
    //     <Tr>
    //       <Td
    //         paddingBottom="5px"
    //         paddingleft="0px"
    //         fontSize="xs"
    //         fontWeight="bold"
    //         verticalAlign="top"
    //       >
    //         Location
    //       </Td>
    //       <Td paddingBottom="5px" fontSize="xs">
    //         lab.local/rakeshgautam/project
    //       </Td>
    //     </Tr>
    //     <Tr>
    //       <Td
    //         paddingBottom="5px"
    //         paddingLeft="0px"
    //         fontSize="xs"
    //         fontWeight="bold"
    //         verticalAlign="top"
    //       >
    //         Slides Type
    //       </Td>
    //       <Td paddingBottom="5px" fontSize="xs">
    //         H & E
    //       </Td>
    //     </Tr>
    //     <Tr>
    //       <Td
    //         paddingBottom="5px"
    //         paddingLeft="0px"
    //         fontSize="xs"
    //         fontWeight="bold"
    //         verticalAlign="top"
    //       >
    //         Project Type
    //       </Td>
    //       <Td paddingBottom="5px" fontSize="xs">
    //         Single-Slide Project
    //       </Td>
    //     </Tr>
    //   </Tbody>
    // </Table>
  );
};

export default BasicInfo;
