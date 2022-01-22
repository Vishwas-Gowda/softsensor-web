import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Select,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import TypeButton from "../typeButton";
import { FaShare } from "react-icons/fa";
import { BiLink } from "react-icons/bi";

const ShareLink = (restProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <>
      <Button
        size="sm"
        variant="solid"
        h={6}
        px="27px"
        borderRadius="4px"
        rightIcon={<FaShare color="#000" />}
        backgroundColor="#DDDDDD"
        _hover={{
          backgroundColor: "white",
        }}
        _focus={{
          backgroundColor: "white",
          border: "none",
        }}
        color="#000"
        fontFamily="sans-serif"
        textTransform="capitalize"
        fontSize="xs"
        {...restProps}
        onClick={() => {
          setIsOpen(true);
        }}
        transform="scale(1.5)"
      >
        Share
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogContent className="share">
          <AlertDialogHeader color="#3965C6" padding="20px">
            <Flex>
              <TypeButton size={28} color="black" marginRight="10px" />
            </Flex>
          </AlertDialogHeader>
          <AlertDialogBody space={2}>
            <Flex>
              <Flex border="0.5px solid " borderColor="#B3D9FF" px="5px">
                <Input
                  size="sm"
                  variant="unstyled"
                  placeholder="Share with people and groups"
                />
                <Select
                  variant="unstyled"
                  placeholder="can edit"
                  marginLeft={5}
                  width={130}
                  size="sm"
                >
                  <option value="option1">can view</option>
                  <option value="option2">can comment</option>
                </Select>
              </Flex>
              <Button
                backgroundColor="#3965C6"
                color="white"
                variant="solid"
                size="sm"
                ml={3}
                paddingLeft={5}
                paddingRight={5}
                _hover={{ bg: "#66a3ff" }}
              >
                send invite
              </Button>
            </Flex>
            <Flex colorScheme="blue">
              <TypeButton
                icon={<BiLink />}
                marginTop={2}
                marginRight={3}
                size={15}
              />
              <Select
                variant="unstyled"
                placeholder="Anyone with the link"
                marginTop={2}
                width="12em"
                size="sm"
              >
                <option value="option1">Restricted</option>
              </Select>
              <Spacer />
              <Select
                variant="unstyled"
                placeholder="can edit"
                marginLeft={5}
                width={130}
                size="sm"
              >
                <option value="option1">can view</option>
                <option value="option2">can comment</option>
              </Select>
            </Flex>
            <Stack>
              <Box
                border="0.5px solid"
                borderColor="#B3D9FF"
                borderRadius="5px"
                padding="10px"
              >
                <Flex>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    marginRight={3}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt="Zoe Margut"
                  />
                  <Box>
                    <Text color="#3965C6" fontWeight="bold" fontSize={17}>
                      Zoe Margot (You)
                    </Text>
                    <Text color="#80AAFF" fontSize={14}>
                      zoemargut27@gmail.com
                    </Text>
                  </Box>
                  <Spacer />
                  <Center color="CCCCB3" as="i">
                    Owner
                  </Center>
                </Flex>
              </Box>
            </Stack>
          </AlertDialogBody>
          <Flex>
            <Button
              backgroundColor="#3965C6"
              color="white"
              variant="ghost"
              size="sm"
              m={6}
              _hover={{ bg: "#66a3ff" }}
            >
              Give Feedback
            </Button>
            <Spacer />
            <Button
              backgroundColor="#3965C6"
              color="white"
              variant="solid"
              size="sm"
              m={6}
              _hover={{ bg: "#66a3ff" }}
              onClick={() => onClose()}
            >
              Done
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShareLink;
