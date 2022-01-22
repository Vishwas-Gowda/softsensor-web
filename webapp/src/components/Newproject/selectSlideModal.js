import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Image,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import PreviewSlides from "./previewSlides";
import { getSlideUrl } from "../../hooks/utility";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { addSlides, updateCases } from "../../state/reducers/newProjectReducer";

const SelectSlideModal = ({ isOpen, onClose, slides }) => {
  const [selected, setSelected] = useState({});
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const handleClick = (slide) => {
    if (_.has(selected, slide._id) && selected[slide._id]) {
      setSelected({ ...selected, [slide._id]: null });
      setCount(count - 1);
    } else {
      setSelected({ ...selected, [slide._id]: slide });
      setCount(count + 1);
    }
  };

  const handleSelectedSlides = () => {
    const projectSlides = [];
    const cases = [];

    _.values(selected).map((value) => {
      if (value) {
        projectSlides.push([value]);
      }
    });
    projectSlides.map((slide, index) => {
      cases.push({ name: `case${index + 1}`, slides: slide });
    });
    dispatch(addSlides(projectSlides));
    dispatch(updateCases(cases));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader fontFamily="roboto" fontWeight="400" fontSize="18px">Select Slides</ModalHeader>
        <ModalCloseButton color="#000" border ="1px solid #000" />
        <ModalBody>
          <SimpleGrid
            minChildWidth="100px"
            spacing={2}
            p={2}
            borderRadius="5px"
            bgColor="rgba(236, 236, 236, 1)"
            maxW="100%"
          >
            {slides?.map((slide) => {
              const slideUrl = getSlideUrl(slide.awsImageBucketUrl);
              return (
                <VStack
                  key={slide._id}
                  spacing={0}
                  onClick={() => handleClick(slide)}
                  cursor="pointer"
                >
                  <Image
                    w="100px"
                    h="80px"
                    objectFit="cover"
                    borderRadius="5px"
                    src={slideUrl}
                    border={
                      _.has(selected, slide._id) && selected[slide._id]
                        ? "2px solid #68D761"
                        : ""
                    }
                  />
                  <Text color="#000">{slide.slideName}</Text>
                </VStack>
              );
            })}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="#fff" color="#000" border="1px solid #000" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            bgColor="rgba(7, 132, 228, 1)"
            color="#fff"
            disabled={count === 0}
            onClick={handleSelectedSlides}
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectSlideModal;
