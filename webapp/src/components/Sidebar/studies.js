import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from "@chakra-ui/react";
import BasicInfo from '../Studies/basicInfo';
import StudyAction from '../Studies/studyAction';
import ImageAction from '../Studies/imageAction';

const Studies = () => {
    return (
        <Accordion defaultIndex={[0]} allowMultiple fontFamily="roboto">
            <AccordionItem borderTop="none">
                <AccordionButton _focus={{ border: "none" }} paddingLeft="0px">
                    <Box flex="1" textAlign="left">
                        Basic Information
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel padding="0px" marginBottom="1em">
                    <BasicInfo />
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem paddingBottom="0px">
                <AccordionButton _focus={{ border: "none" }} paddingLeft="0px">
                    <Box flex="1" textAlign="left">
                        Study Action
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <StudyAction />
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderBottom="none">
                <AccordionButton _focus={{ border: "none" }} paddingLeft="0px">
                    <Box flex="1" textAlign="left">
                        Image Action
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <ImageAction />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Studies;