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
      backgroundColor="white"
      margin="20px"
      padding="20px"
      direction="column"
    >
      <HStack borderBottom="1px solid #3965C5" marginLeft="15px">
        <Text
          className="last__reports__title"
          color="#3965C5"
          fontWeight="100"
          paddingBottom="10px"
          width="95%"
        >
          Project Invitation
        </Text>
        <Spacer />
        <Link fontSize="xs" color="#3965C5" w="50px" marginBottom="0px">
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
                  borderBottom="1px solid #3965C5"
                >
                  <VStack>
                    <Text width="100%" color="#3965C5" textAlign="left">
                      {invite.project?.name}
                    </Text>
                    <HStack width="100%">
                      <Text color="#8aaeff" fontSize="xs">
                        {invite.sender?.firstName +
                          " " +
                          invite.sender?.lastName}
                        <Icon as={BsCircleFill} w={1} h={1} ml={1} />
                      </Text>
                      <Text color="#8aaeff" fontSize="xs">
                        {moment(invite.createdAt).fromNow()}
                      </Text>
                    </HStack>
                    <Link
                      width="100%"
                      color="#3965C5"
                      textAlign="left"
                      fontSize="sm"
                    >
                      Details <Icon as={MdKeyboardArrowRight} h={3} />
                    </Link>
                  </VStack>
                  <Spacer />
                  <VStack marginRight="1em">
                    <Button
                      size="sm"
                      width="8em"
                      color="white"
                      backgroundColor="#3965C5"
                      _hover={{ bg: "#66a3ff" }}
                      onClick={() => acceptInvite(invite)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      width="8em"
                      color="#3965C5"
                      backgroundColor="white"
                      border="1px solid #3965C5"
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
