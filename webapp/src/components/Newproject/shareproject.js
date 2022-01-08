import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMembers,
  resetNewProject,
} from "../../state/reducers/newProjectReducer";
import Projectdetails from "./projectdetails";
import Selectslide from "./selectSlide";
import Questionnaire from "./createQuestionnaire";
import "../../styles/newproject.css";
import {
  Box,
  Button,
  Text,
  Input,
  InputGroup,
  Menu,
  InputRightElement,
  MenuList,
  MenuItem,
  MenuButton,
  Image,
  Icon,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Divider,
} from "@chakra-ui/react";

import { AddIcon, ChevronDownIcon, LinkIcon } from "@chakra-ui/icons";
import { AiOutlineUserAdd } from "react-icons/ai";
import {BsChevronDown } from "react-icons/bs";
import {
  useGetUserInfoQuery,
  useSearchUserMutation,
} from "../../state/api/medicalApi";
import { useAuth0 } from "@auth0/auth0-react";

const Share = () => {
  const [userImage, setUserImage] = useState();
  const { user } = useAuth0();
  const { data } = useGetUserInfoQuery({
    subClaim: user?.sub,
  });
  const [value, setValue] = useState("");
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const { membersInfo } = useSelector((state) => state.newProjectState);
  const [searchUser] = useSearchUserMutation();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setValue(e.target.value);
    if (isInvalidUser) setIsInvalidUser(false);
  };
  const handleAddMember = async () => {
    if (!value || value === data?.user.emailAddress) {
      setIsInvalidUser(true);
      return;
    }
    const info = await searchUser({
      subClaim: user?.sub,
      searchObject: { emailAddress: value },
    });
    if (info.data.length > 0)
      dispatch(addMembers({ email: value, info: info.data[0] }));
    setValue("");
    setIsInvalidUser(info.data.length === 0);
  };

  return (
    <>
      <Box>
        <Box className="questions_div" fontFamily="inter">
          <Text marginTop={-16} fontSize={14} color="#3965C6" marginLeft={2.5}>
            Share with readers
            <br />
            <InputGroup>
              <Input
                width={590}
                name="readers_list"
                marginTop="18px"
                border="1px"
                borderColor="#2e519e"
                opacity={0.6}
                bg="rgba(0, 50, 160, 0.1)"
                value={value}
                type="email"
                onChange={(e) => handleInput(e)}
              />
              <InputRightElement
                marginTop="18px"
                onClick={handleAddMember}
                cursor="pointer"
                children={
                  <AiOutlineUserAdd name="add" color="blue.500" size={20} />
                }
              />
            </InputGroup>
            {isInvalidUser && (
              <Text mt={2} ml={2} fontSize={16}>
                Not a valid user
              </Text>
            )}
          </Text>
          <br />
          <Box marginTop={50} marginLeft={-600}>
            <Menu>
              <MenuButton
                icon={<LinkIcon color="rgba(57, 101, 198, 0.65)" />}
                as={Button}
                rightIcon={<BsChevronDown color= "#3965C6" w="14px"/>}
                bg="white"
                fontFamily="inter"
                fontSize="14px"
                color="rgba(57, 101, 198, 0.45)"
              >
                <LinkIcon marginRight={3} />
                Anyone with the link
              </MenuButton>
              <MenuList>
                <MenuItem fontFamily="inter"
                fontSize="14px" icon={<LinkIcon color="rgba(57, 101, 198, 0.65)"/>}>Anyone with the link</MenuItem>
                {/* <MenuItem icon={<AddIcon />}>Robert Rogers</MenuItem>
                <MenuItem icon={<AddIcon />}>Zoe Margut</MenuItem> */}
              </MenuList>
            </Menu>
          </Box>
          <Box
            className="questions_div"
            w={550}
            display="block"
            marginTop={-20}
          >
            <HStack alignItems="center">
              <Avatar
                size="md"
                borderRadius="full"
                name={`${data?.user.firstName} ${data?.user.lastName}`}
                // src={userImage}
                alt="User"
                mt={3}
              />
              <VStack ml={2} align="flex-start" spacing={0} whiteSpace="nowrap">
                <Text fontSize={16} color="#3965C6" pt={2} fontWeight={500}>
                  {`${data?.user.firstName} ${data?.user.lastName} (You)`}
                </Text>
                <Text fontSize={12} color="#3965C6">{data?.user.emailAddress}</Text>
              </VStack>
              <Spacer />
              <Text fontStyle="italic" color="rgba(57, 101, 198, 0.46)" fontSize={16} fontWeight={500}>Owner</Text>
            </HStack>
            <Divider mt={4} bgColor="black" border="none" h="0.1px" w={550} />
            {membersInfo.map((member) => {
              return (
                <HStack key={member._id}>
                  <Avatar
                    size="md"
                    borderRadius="full"
                    name={`${member.firstName} ${member.lastName}`}
                    // src={userImage}
                    alt="User"
                    mt={3}
                  />
                  <VStack
                    ml={2}
                    align="flex-start"
                    spacing={0}
                    whiteSpace="nowrap"
                  >
                    <Text fontSize={16} color="#3965C6" pt={2} fontWeight={500}>
                      {`${member.firstName} ${member.lastName}`}
                    </Text>
                    <Text fontSize={12} color="#3965C6">{member.email}</Text>
                  </VStack>
                  <Spacer />
                  <Text fontStyle="italic" color="rgba(57, 101, 198, 0.46)" fontSize={16} fontWeight={500}>Reader</Text>
                </HStack>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Share;
