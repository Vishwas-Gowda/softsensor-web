import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import QuestionType from "./questionType";

const Questionnaire = ({ direction, questions, response, ...restProps }) => {
  return (
    <VStack spacing={6} pl="20px" align="flex-start" {...restProps} bgColor="rgba(236, 236, 236, 1)" mt="0px">
      {questions?.map((question, index) => (
        <Stack
          key={question._id ? question._id : index}
          direction={direction}
          spacing={4}
          mt="15px"
        >
          <Text fontFamily="roboto"
              fontSize="14px" whiteSpace="nowrap">{`Q${index + 1}. ${
            question.questionText
          }`}</Text>
          <Box>
            <QuestionType
              question={question}
              direction={direction}
              response={response}
            />
          </Box>
        </Stack>
      ))}
    </VStack>
  );
};

export default Questionnaire;
