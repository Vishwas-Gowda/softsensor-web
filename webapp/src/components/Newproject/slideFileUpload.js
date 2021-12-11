import React, { useRef, useState } from "react";
import { CSVReader } from "react-papaparse";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
  HStack,
  IconButton,
  Popover,
  Spacer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetUserInfoQuery } from "../../state/api/medicalApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSlides,
  updateCases,
  updateFile,
} from "../../state/reducers/newProjectReducer";
import PreviewSlides from "./previewSlides";
import Projectdetails from "./projectdetails";
import InfoLink from "./infoLink";
import SelectSlideModal from "./selectSlideModal";

const SlideFileUpload = () => {
  const { user } = useAuth0();
  const { data: userInfo } = useGetUserInfoQuery({
    subClaim: user?.sub,
  });
  const { projectDetails, uploadedFile, slides } = useSelector(
    (state) => state.newProjectState
  );
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [isWrongFile, setIsWrongFile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDropFile = (csvFile) => {
    if (
      csvFile.length === 0 ||
      (projectDetails.projectType === "singleSlide" &&
        csvFile[0].data.length !== 2) ||
      (projectDetails.projectType === "multiSlide" &&
        csvFile[0].data.length !== 3)
    ) {
      setIsWrongFile(true);
      dispatch(updateFile(""));
      dispatch(addSlides([]));
      return;
    }
    const cases = [];
    const projectSlides = [];
    for (let col of csvFile) {
      // check if slide in csv file is present in list of user slides
      const slide1 = userInfo?.user.slides.find(
        (e) => e.slideName === col.data[1]
      );
      const slides = [slide1?._id ? slide1 : null];
      // id slide found in user slides create an object with id
      // else create an empty object
      const caseSlides = [slide1?._id ? { _id: slide1?._id } : ""];

      // if project is multiSlide then check second slide too
      if (col.data.length === 3) {
        const slide2 = userInfo?.user.slides.find(
          (e) => e.slideName === col.data[2]
        );

        caseSlides.push(slide2?._id ? { _id: slide2?._id } : "");
        slides.push(slide2?._id ? slide2 : null);
      }
      cases.push({ name: col.data[0], slides: caseSlides });
      projectSlides.push(slides);
    }
    dispatch(updateCases(cases));
    dispatch(updateFile(inputRef.current.state.file.name));
    dispatch(addSlides(projectSlides));
    setIsWrongFile(false);
  };

  const handleRemoveFile = () => {
    dispatch(updateCases([]));
    dispatch(updateFile(""));
    dispatch(addSlides([]));
    setIsWrongFile(false);
  };
  const handleFileError = () => {};

  return (
    <Box maxW={700}>
      <VStack ml={4} spacing={8} maxW={600}>
        <FormControl>
          <FormLabel>Select Slide</FormLabel>
          <Button
            w="90%"
            placeholder="Select Slides"
            variant="filled"
            borderColor="#3965C550"
            bgColor="#3965C520"
            color="#3965C5"
            disabled={projectDetails.projectType === "multiSlide"}
            onClick={onOpen}
          >
            Select Slides
          </Button>
          <SelectSlideModal
            isOpen={isOpen}
            onClose={onClose}
            slides={userInfo?.user.slides}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Select CSV File</FormLabel>
          <HStack>
            <CSVReader
              ref={inputRef}
              onDrop={handleDropFile}
              onError={handleFileError}
              onRemoveFile={handleRemoveFile}
              addRemoveButton
              style={{
                dropArea: {
                  padding: 8,
                  width: "90%",
                },
                dropFile: {
                  width: 120,
                  height: 100,
                },
              }}
            >
              <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
            <InfoLink />
          </HStack>
          <Text fontSize={20} p={2}>
            {uploadedFile && `Uploaded File : ${uploadedFile}`}
          </Text>
          <Text fontSize={20} color="red" px={2}>
            {isWrongFile && "Check the file: Wrong format"}
          </Text>
        </FormControl>
      </VStack>
      {slides.length > 0 && (
        <Box ml={4} w="100%">
          <Text mb={2}>Preview Slides</Text>
          <PreviewSlides projectSlides={slides} />
        </Box>
      )}
    </Box>
  );
};

export default SlideFileUpload;
