import React from "react";
import {
  Button,
  Box,
  Flex,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../../styles/dashboard.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetUserInfoQuery,
  useGetUserInvitationsQuery,
  useRespondToProjectInvitationMutation,
} from "../../state/api/medicalApi";
import moment from "moment";
import Loading from "../Loading/loading";

const ProjectInvite = () => {
  const { user } = useAuth0();
  const { data: invites, isLoading } = useGetUserInvitationsQuery({
    subClaim: user?.sub,
  });
  const [respondToProjectInvitation] = useRespondToProjectInvitationMutation();

  const acceptInvite = async (invite) => {
    await respondToProjectInvitation({
      subClaim: user?.sub,
      invitationId: invite,
      userResponse: "accepted",
    });
  };

  const declineInvite = async (invite) => {
    await respondToProjectInvitation({
      subClaim: user?.sub,
      invitationId: invite,
      userResponse: "rejected",
    });
  };

  return (
    <Flex
      className="last__reports"
      backgroundColor="#F3F3F3"
      margin="20px"
      padding="20px"
      paddingBottom="50px"
      direction="column"
      borderRadius="5px"
    >
      <HStack borderBottom="1px solid #000" marginLeft="15px">
        <Text
          className="last__reports__title"
          color="rgba(0, 21, 63, 1)"
          fontWeight="500"
          paddingBottom="10px"
          width="95%"
          fontSize="20px"
        fontFamily="roboto"
        >
          Project Invitation
        </Text>
        <Spacer />
        <Link fontSize="xs" color="rgba(0, 21, 63, 1)" w="50px" fontSize="12px"
        fontFamily="roboto" marginBottom="0px" borderBottom="1px solid #000">
          View All
        </Link>
      </HStack>
      {isLoading ? (
        <Loading />
      ) : (
        <Box className="project_invitation_box">
          <VStack marginLeft="1em">
            {invites?.projectInvitations.map((invite) => {
              return (
                <Flex
                  key={invite._id}
                  width="26.5em"
                  paddingY="1em"
                  borderBottom="1px solid #000"
                >
                  <VStack>
                    <Text width="100%" color="#000" textAlign="left" fontSize="16px" fontWeight="500"
                      fontFamily="roboto">
                      {invite.project?.name}
                    </Text>
                    <HStack width="100%">
                      <Text color="#000" fontSize="14px" fontFamily="roboto">
                        {invite.sender?.firstName +
                          " " +
                          invite.sender?.lastName}
                        <Icon as={BsCircleFill} w={1} h={1} ml={1} />
                      </Text>
                      <Text color="#000" fontSize="14px" fontFamily="roboto">
                        {moment(invite.createdAt).fromNow()}
                      </Text>
                    </HStack>
                    <Link
                      width="100%"
                      color="#000"
                      textAlign="left"
                      fontSize="14px"
                      fontFamily="roboto"
                    >
                      Details <Icon as={MdKeyboardArrowRight} h={3} color="#000"/>
                    </Link>
                  </VStack>
                  <Spacer />
                  <VStack marginRight="1em">
                    <Button
                      size="sm"
                      width="127px"
                      height="32px"
                      color="white"
                      fontSize="14px"
                      fontFamily="inter"
                      fontWeight="500"
                      backgroundColor="#0784E4"
                      _hover={{ bg: "#66a3ff" }}
                      onClick={() => acceptInvite(invite)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      width="127px"
                      height="32px"
                      color="#7ABCEF"
                      fontSize="14px"
                      fontFamily="inter"
                      fontWeight="500"
                      backgroundColor="white"
                      border="1px solid #0784E4"
                      onClick={() => declineInvite(invite)}
                    >
                      Decline
                    </Button>
                  </VStack>
                </Flex>
              );
            })}
          </VStack>
        </Box>
      )}
    </Flex>
  );
};

export default ProjectInvite;
