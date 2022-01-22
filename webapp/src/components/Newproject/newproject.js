import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, MenuItem, Icon, Spacer, Image } from "@chakra-ui/react";
import Projectdetails from "./projectdetails";
import Selectslide from "./selectSlide";
import CreateQuestionnaire from "./createQuestionnaire";
import Share from "./shareproject";
import { MdCardMembership } from "react-icons/md";
import { BsShareFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import {AiOutlineFileText,AiOutlineFileExclamation ,AiOutlineSelect} from 'react-icons/ai';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DashboardMenu from "../Dashboard/menu";
import Header from "./header";
import { resetNewProject } from "../../state/reducers/newProjectReducer";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useCreateProjectMutation,
  useAddMultipleMembersToProjectMutation,
  useGetUserInfoQuery,
} from "../../state/api/medicalApi";
import Loading from "../Loading/loading";
import { getAccessToken, getUserId } from "../../hooks/utility";
import useUserAuthentication from "../../hooks/useUserAuthentication";
import Projectlist from "./projectlist";

const Newproject = () => {
  const [activeOption, setActiveOption] = useState("projectDetails");
  const { user } = useAuth0();
  const { projectDetails, members, questions } = useSelector(
    (state) => state.newProjectState
  );
  const isUserAuthenticated = useUserAuthentication();
  const id = getUserId(user);
  const history = useHistory();
  const { isLoading } = useGetUserInfoQuery({
    subClaim: user?.sub,
  });
  const [createProject] = useCreateProjectMutation();
  const [addMultipleMembersToProject] =
    useAddMultipleMembersToProjectMutation();
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetNewProject());
  };

  const [buttonStyleProjectDetails, setButtonStyleProjectDetails] =
    useState("selected_button");
  const [buttonBackgroundProjectDetails, setButtonBackgroundProjectDetails] =
    useState("#0784E4");
  const [buttonStyleSelectSlide, setButtonStyleSelectSlide] =
    useState("unselected_button");
  const [buttonBackgroundSelectSlide, setButtonBackgroundSelectSlide] =
    useState("#F3F3F3");
  const [buttonStyleQuestionnaire, setButtonStyleQuestionnaire] =
    useState("unselected_button");
  const [buttonBackgroundQuestionnaire, setButtonBackgroundQuestionnaire] =
    useState("##F3F3F3");
  const [buttonStyleShare, setButtonStyleShare] = useState("unselected_button");
  const [buttonBackgroundShare, setButtonBackgroundShare] = useState("#F3F3F3");
  const [buttonText, setButtonText] = useState("Next");

  const handleCreateProject = async () => {
    const resp = await createProject({
      subClaim: user?.sub,
      uploadType: "multiUpload",
      questionnaire: {
        questions,
      },
      ...projectDetails,
    });
    await addMultipleMembersToProject({
      subClaim: user?.sub,
      usernames: members,
      projectId: resp.data._id,
    });
    dispatch(resetNewProject());
    history.push(`/${id}/dashboard/projects`);
    handleActiveOptionProjectDetails();
  };

  const handleActiveOptionProjectDetails = (e) => {
    setActiveOption("projectDetails");
    setButtonStyleProjectDetails("selected_button");
    setButtonBackgroundProjectDetails("#0784E4");
    setButtonStyleSelectSlide("unselected_button");
    setButtonStyleShare("unselected_button");
    setButtonStyleQuestionnaire("unselected_button");
    setButtonBackgroundSelectSlide("#F3F3F3");
    setButtonBackgroundQuestionnaire("#F3F3F3");
    setButtonBackgroundShare("#F3F3F3");
    setButtonText("Next");
  };
  const handleActiveOptionSelectSlide = (e) => {
    setActiveOption("selectSlide");
    setButtonStyleSelectSlide("selected_button");
    setButtonStyleShare("unselected_button");
    setButtonStyleQuestionnaire("unselected_button");
    setButtonStyleProjectDetails("unselected_button");
    setButtonBackgroundSelectSlide("#0784E4");
    setButtonBackgroundProjectDetails("#F3F3F3");
    setButtonBackgroundQuestionnaire("#F3F3F3");
    setButtonBackgroundShare("#F3F3F3");
    setButtonText("Next");
  };
  const handleActiveOptionQuestionnaire = (e) => {
    setActiveOption("questionnaire");
    setButtonStyleQuestionnaire("selected_button");
    setButtonStyleProjectDetails("unselected_button");
    setButtonStyleSelectSlide("unselected_button");
    setButtonStyleShare("unselected_button");
    setButtonBackgroundQuestionnaire("#0784E4");
    setButtonBackgroundProjectDetails("#F3F3F3");
    setButtonBackgroundSelectSlide("#F3F3F3");
    setButtonBackgroundShare("#F3F3F3");
    setButtonText("Next");
  };
  const handleActiveOptionShare = (e) => {
    setActiveOption("Share");
    setButtonStyleShare("selected_button");
    setButtonStyleProjectDetails("unselected_button");
    setButtonStyleSelectSlide("unselected_button");
    setButtonStyleQuestionnaire("unselected_button");
    setButtonBackgroundShare("#0784E4");
    setButtonBackgroundQuestionnaire("#F3F3F3");
    setButtonBackgroundProjectDetails("#F3F3F3");
    setButtonBackgroundSelectSlide("#F3F3F3");
    setButtonText("Create");
  };

  const setNextButton = () => {
    if (activeOption === "selectSlide") {
      setButtonText("Share");
      handleActiveOptionQuestionnaire();
    } else if (activeOption === "questionnaire") {
      handleActiveOptionShare();
      setButtonText("Create");
    } else if (activeOption === "projectDetails") {
      handleActiveOptionSelectSlide();
      setButtonText("Next");
    } else {
      handleCreateProject();
    }
  };

  return !isUserAuthenticated || isLoading ? (
    <Loading />
  ) : (
    <>
      <DashboardMenu />
      <Box
        marginLeft="14em"
        height="100vh"
        direction="column"
        backgroundColor="#fff"
      >
        <Header />
        <Box className="div_overlay" fontFamily="roboto">
          <Box>
            <Button
              className={buttonStyleProjectDetails}
              name="projectDetails"
              onClick={(e) => handleActiveOptionProjectDetails(e)}
              background={buttonBackgroundProjectDetails}
              marginRight={3}
              fontSize="14px"
              fontFamily="roboto"
              fontWeight={400}
            >
              <Icon as={AiOutlineFileText} marginRight="12px" w="14px" h="14px" />
              Project details
            </Button>
            <Button
              className={buttonStyleSelectSlide}
              name="selectSlide"
              onClick={(e) => handleActiveOptionSelectSlide(e)}
              background={buttonBackgroundSelectSlide}
              fontSize="14px"
              fontFamily="roboto"
              fontWeight={400}
              marginRight={3}
            >
              <Icon as={AiOutlineSelect} marginRight="12px" w="14px" h="14px" />
              Select Slides
            </Button>
            <Button
              className={buttonStyleQuestionnaire}
              name="questionnaire"
              onClick={(e) => handleActiveOptionQuestionnaire(e)}
              background={buttonBackgroundQuestionnaire}
              fontFamily="roboto"
              fontWeight={400}
              fontSize="14px"
              marginRight={3}
            >
              <Icon as={AiOutlineFileExclamation} marginRight="12px" w="14px" h="14px" />
              Questionnaire
            </Button>
            <Button
              className={buttonStyleShare}
              name="Share"
              onClick={(e) => handleActiveOptionShare(e)}
              background={buttonBackgroundShare}
              fontWeight={400}
              fontFamily="roboto"
              fontSize="14px"
              marginRight={3}
            >
              <Icon as={BsShareFill} marginRight="12px" w="14px" h="14px" />
              Share
            </Button>
          </Box>
          <Box className="dividing_div" />
          <Box>
            {activeOption === "projectDetails" && <Projectdetails />}
            {activeOption === "selectSlide" && <Selectslide />}
            {activeOption === "questionnaire" && <CreateQuestionnaire />}
            {activeOption === "Share" && <Share />}
          </Box>
          <Box className="bottom_div">
            <Button
              className="reset"
              width={127}
              fontFamily="roboto"
              fontSize="14px"
              fontWeight="500"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="savennext"
              bg="#0784E4"
              color="white"
              width={127}
              fontFamily="roboto"
              fontSize="14px"
              fontWeight="500"
              marginLeft="-100px"
              onClick={() => setNextButton()}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
        <Box className="right_div">
          <Projectlist />
        </Box>
      </Box>
    </>
  );
};

export default Newproject;
