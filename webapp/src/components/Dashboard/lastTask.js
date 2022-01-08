import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
  Spinner,
  Box
} from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";
import { useGetLastTaskQuery } from "../../state/api/medicalApi";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { Link as RouteLink } from "react-router-dom";
import Loading from "../Loading/loading";

const LastTask = () => {
  const { user } = useAuth0();
  const {
    data: { recentCaseWorkedOn } = {},
    error,
    isLoading,
  } = useGetLastTaskQuery({
    subClaim: user?.sub,
  });
  const id = user?.sub.substring(user?.sub.indexOf("|") + 1);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!recentCaseWorkedOn) return;
    const slideUrl = recentCaseWorkedOn?.slides[0].awsImageBucketUrl;
    setUrl(
      slideUrl.substring(0, slideUrl.lastIndexOf(".")) + "_files/8/0_0.jpeg"
    );
  }, [recentCaseWorkedOn]);

  return (
    <Flex
      className="last__task"
      backgroundColor="white"
      margin="20px"
      // width="26.5em"
      padding="20px"
      direction="column"
      paddingBottom="50px"
      borderRadius="5px"
    >
      <Text
        className="last__task__head"
        color="#3965C5"
        fontWeight="400"
        borderColor="#3965C5"
        borderBottom="1px"
        paddingBottom="5px"
        width="95%"
        marginLeft="15px"
        fontSize="20px"
        fontFamily="inter"
      >
        Last Task
      </Text>
      {isLoading ? (
        <Loading />
      ) : error || !recentCaseWorkedOn ? (
        <Text> No Task Available</Text>
      ) : (
        <>
          <Image className="last__task__img" src={url} marginTop="10px" />
          <HStack>
            <Text
              className="last__task__title"
              color="#3965C5"
              fontWeight="400"
              marginLeft="15px"
              marginTop="10px"
              paddingBottom="10px"
              fontSize="16px"
              fontFamily="inter"
            >
              {recentCaseWorkedOn?.slides[0].slideName}
            </Text>
            <Spacer />
            {/* <Stack direction="row" justify="end">
                    <Avatar name="Zoe Margot" size="sm" />
                    <Avatar name="Rakesh Gautam" size="sm" />
                    <Avatar name="Mila Maghudiya" size="sm" />
                </Stack> */}
               <Text color="#8aaeff" fontSize="14px"
              fontFamily="inter">{`${recentCaseWorkedOn?.slides.length-1} slides remaining`}</Text> 
          </HStack>
          <HStack >
            <Box >
          <Text color="#8aaeff" fontSize="14px" margin="0px 0px 8px 15px"
              fontFamily="inter" >
            {recentCaseWorkedOn?.name}
            <Icon as={BsCircleFill} mx={1} w={1} h={1} />{" "}
            {moment(recentCaseWorkedOn?.createdAt).format("MMM DD, YYYY")}
          </Text>
          <Text color="#8aaeff" fontSize="14px"
              fontFamily="inter" marginLeft="15px">
            {`Created by ${
              recentCaseWorkedOn?.caseOwner.firstName +
              recentCaseWorkedOn?.caseOwner.lastName
            }`}
          </Text>
          </Box>
            <Spacer />
            <Link
              as={RouteLink}
              to={{
                pathname: `/${id}/project/${recentCaseWorkedOn?.projectId}/slideRedirect`,
                state: {
                  caseId: recentCaseWorkedOn?._id,
                  questionnaire: recentCaseWorkedOn?.questionnaire,
                },
              }}
              _hover={{ textDecoration: "none" }}
            >
              <Button
                backgroundColor="#3965c5"
                color="white"
                fontWeight="500"
                fontFamily="inter"
                fontSize="14px"
                marginTop="13px"
                w="120px"
                h="32px"
                _hover={{ bg: "#66a3ff" }}
              >
                Continue
              </Button>
            </Link>
            </HStack>
        </>
      )}
    </Flex>
  );
};

export default LastTask;
