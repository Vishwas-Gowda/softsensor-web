import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  HStack,
  Box,
  Avatar,
  Text,
  Spacer,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  VStack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FiEdit, FiSearch } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { RiEqualizerLine } from "react-icons/ri";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "../../state/reducers/chatReducer";
import { getTimestamp } from "../../hooks/utility";
import { Scrollbars } from "react-custom-scrollbars";
import "../../styles/scrollBar.css";

const MessageBox = ({ isOpen, onClose }) => {
  const { guestList, username, roomName, alias, socket } = useSelector(
    (state) => state.socketState
  );
  const { messages } = useSelector((state) => state.chatState);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const scrollbar = useRef(null);

  useEffect(() => {
    if (scrollbar.current) scrollbar.current.scrollToBottom();
  }, [messages]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const sendMessage = () => {
    if (value === "") return;
    const message = {
      content: value,
      username: alias,
      time: getTimestamp(),
    };
    dispatch(updateMessages([...messages, message]));
    socket.emit(
      "send_message",
      JSON.stringify({
        roomName,
        messages: [...messages, message],
      })
    );
    setValue("");
  };

  const UserAvatar = (restProps) => {
    return <Avatar size="sm" backgroundColor="black" color="#3965C3" />;
  };

  const MessageButton = (restProps) => {
    return (
      <IconButton
        variant="unstyled"
        border="none"
        size="xs"
        _focus={{ border: "none" }}
        {...restProps}
      />
    );
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="xs"
      trapFocus={false}
      lockFocusAcrossFrames={false}
    >
      <ModalContent
        top="10rem"
        left="25rem"
        border="0.2px solid #3965C650"
        borderRadius="15px"
      >
        <ModalBody color="#3965C6" p={2}>
          <HStack spacing={0} mb={2}>
            <Text>Chat Box</Text>
            <Spacer />
            <MessageButton icon={<FiSearch size={15} />} />
            <MessageButton icon={<IoEllipsisHorizontal size={15} />} />
          </HStack>
          {/* <InputGroup bgColor="#3965C610" borderRadius="5px" my={4}>
            <InputLeftElement
              pointerEvents="none"
              color="#3965C645"
              children={<FiSearch size={20} />}
            />
            <Input
              placeholder="Search Messages"
              color="#3965C645"
              _focus={{ border: "none" }}
            />
            <InputRightElement
              pointerEvents="none"
              color="#3965C645"
              children={<RiEqualizerLine size={20} />}
            />
          </InputGroup>
          {console.log(guestList)}
          <VStack
            divider={<StackDivider h="1px" bgColor="#3965C6" border="none" />}
            mb="10px"
          >
            {guestList.map((user) => {
              if (user.username === username) return;
              return (
                <HStack w="100%" key={user.username} spacing={4}>
                  <UserAvatar name={user.alias} />
                  <Text>{user.alias}</Text>
                </HStack>
              );
            })}
          </VStack> */}
          <Scrollbars
            ref={scrollbar}
            style={{ width: "100%", height: "20rem" }}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical-messageBox" />
            )}
          >
            <VStack spacing={2} align="start" justify="end">
              {messages.map((message, index) => (
                <Box
                  maxW="85%"
                  key={index}
                  bgColor="#3965C610"
                  color="#3965C690"
                  py={2}
                  px={4}
                  borderRadius="5px"
                  w="fit-content"
                  wordBreak="break-word"
                  alignSelf={message.username === alias ? "end" : "start"}
                >
                  <Text fontSize="sm" fontWeight="bold">
                    {message.username}
                  </Text>
                  <Text fontSize="sm">{message.content}</Text>
                  <Text align="right" fontSize="0.65rem" fontWeight="bold">
                    {message.time}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Scrollbars>
          <Divider h="1px" border="none" bgColor="#474747" my={2} />
          <Text color="#47474770" fontWeight="bold">
            To Everyone:
          </Text>
          <InputGroup border="none" py={0} mb={3}>
            <Input
              placeholder="Type your message here"
              value={value}
              pl={0}
              color="#474747"
              border="none"
              _focus={{ border: "none" }}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <InputRightElement
              color="#C4C4C4"
              children={
                <IconButton
                  variant="unstyled"
                  p={0}
                  _focus={{ border: "none" }}
                  icon={<BiSend size={25} />}
                  onClick={sendMessage}
                />
              }
            />
          </InputGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MessageBox;
