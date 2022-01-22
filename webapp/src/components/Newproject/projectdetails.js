import { React, useState } from "react";
import { Box, Button, Select, Input, Text, Textarea } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCases,
  resetNewProject,
  updateProject,
} from "../../state/reducers/newProjectReducer";

const Projectdetails = () => {
  const [activeOption, setActiveOption] = useState("projectDetails");
  const { projectDetails } = useSelector((state) => state.newProjectState);
  const dispatch = useDispatch();

  const handleProjectDetails = (e) => {
    dispatch(updateProject({ name: e.target.name, value: e.target.value }));
    if (e.target.name === "projectType") dispatch(resetCases());
  };

  return (
    <>
      <Box className="form_div" fontFamily="roboto" >
        <Box>
          <Text
            htmlFor="project_title"
            color="#000"
            fontSize="14px"
            paddingBottom={3}
          >
            Project Title
          </Text>
          <Input
            type="text"
            id="project_title"
            name="projectName"
            value={projectDetails.projectName}
            width={590}
            borderRadius={5}
            bg="#F8F8F5"
            borderColor="#000"
            _placeholder={{color:"#000"}}
            fontSize="14px"
            placeholder="Eg: Digital Pathology"
            onChange={(e) => handleProjectDetails(e)}
          ></Input>
          <Text
            htmlFor="project_desc"
            paddingTop={6}
            color="#000"
            fontSize="14px"
            paddingBottom={3}
          >
            Project Description
          </Text>
          <Textarea
            id="project_desc"
            name="projectDescription"
            value={projectDetails.projectDescription}
            width={590}
            height={150}
            top="0"
            fontSize="14px"
            bg="#F8F8F5"
            borderColor="#000"
            resize={"none"}
            _placeholder={{color:"#000"}}
            placeholder="Eg: Write a one- or two-paragraph explanation of what the project aims to accomplish"
            onChange={(e) => handleProjectDetails(e)}
          ></Textarea>
          <Text
            htmlFor="project_type"
            paddingTop={6}
            color="#000"
            // fontSize="16px"
            paddingBottom={3}
            style={{ fontSize: "14px" }}
          >
            Project Type
          </Text>
          <Select
            variant="outline"
            id="project_type"
            name="projectType"
            value={projectDetails.projectType}
            onChange={(e) => handleProjectDetails(e)}
            fontSize="14px"
            width={590}
            bg="#F8F8F5"
            borderColor="#000"
          >
            <option value="singleSlide">Single-Slide Project</option>
            <option value="multiSlide">Multi-Slide Project</option>
          </Select>
          <Text
            htmlFor="slide_type"
            paddingTop={6}
            color="#000"
            fontSize="14px"
            paddingBottom={3}
          >
            Slide Type
          </Text>
          <Select
            id="slide_type"
            name="slideType"
            value={projectDetails.slideType}
            width={590}
            bg="#F8F8F5"
            borderColor="#000"
            fontSize="14px"
            onChange={(e) => handleProjectDetails(e)}
          >
            <option value="H&E">H&E</option>
            <option value="trichrome">Trichrome</option>
          </Select>
        </Box>
      </Box>
    </>
  );
};

export default Projectdetails;
