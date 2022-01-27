import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Icon,
    Flex
} from "@chakra-ui/react";
import { HiOutlineFilter} from 'react-icons/hi';
import BasicInfo from '../Studies/basicInfo';
import StudyAction from '../Studies/studyAction';
import ImageAction from '../Studies/imageAction';

const Studies = () => {
    return (
        <Accordion defaultIndex={[0]} allowMultiple color="#000"  >
            
            <AccordionItem borderTop="none" bgColor="#F8F8F5">
                <AccordionButton _focus={{ border: "none" }} >
                    <Box flex="1" textAlign="left" fontSize="14px" fontFamily="roboto">
                        Basic Information
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel padding="0px" >
                    <BasicInfo />
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem paddingBottom="0px" bgColor="#F8F8F5" >
                <AccordionButton _focus={{ border: "none" }} >
                    <Box flex="1" textAlign="left" fontSize="14px" fontFamily="roboto">
                        Study Navigation
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p="0px" >
                    <StudyAction />
                </AccordionPanel>
            </AccordionItem>
            {/* <AccordionItem borderBottom="none">
                <AccordionButton _focus={{ border: "none" }} paddingLeft="0px">
                    <Box flex="1" textAlign="left">
                        Image Action
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <ImageAction />
                </AccordionPanel>
            </AccordionItem> */}
        </Accordion>
    );
};

export default Studies;