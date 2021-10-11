import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const Case = (props) => {
  return (
    <VStack
      w="100%"
      color="white"
      p="10px"
      pr="15px"
      borderRadius="5px"
      backgroundColor="rgba(255,255,255, 0.2)"
      fontSize="xs"
      fontWeight="100"
      align="left"
      spacing={-1}
      {...props}
    >
      <Text>Slide Info/Case</Text>
      <Text>History</Text>
      <Text>Patient information</Text>
    </VStack>
  );
};

export default Case;