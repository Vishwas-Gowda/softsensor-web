import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Spinner } from "@chakra-ui/react";
import _ from "lodash";
import { addViewerWindow } from "../../state/reducers/fabricOverlayReducer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { addViewer } from "../../state/reducers/viewerReducer";
import { useGetCaseInfoQuery } from "../../state/api/medicalApi";

const ViewerRedirect = () => {
  const { user } = useAuth0();
  const location = useLocation();
  const { viewerWindow } = useSelector((state) => state.fabricOverlayState);
  const dispatch = useDispatch();
  const id = user?.sub.substring(user?.sub.indexOf("|") + 1);
  const { caseId, questionnaire } = location?.state;
  const { data: task } = useGetCaseInfoQuery({
    subClaim: user?.sub,
    caseId: caseId,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!viewerWindow || _.keys(viewerWindow).length !== 0) return;
    const viewerIds = [];
    const viewerWindows = [];
    task?.slides.map((slide) => {
      viewerIds.push(slide._id);
      viewerWindows.push({ id: slide._id, tile: slide.awsImageBucketUrl });
    });
    dispatch(addViewer(viewerIds));
    dispatch(addViewerWindow(viewerWindows));
    setIsReady(true);
  }, [viewerWindow, task]);

  return isReady && _.keys(viewerWindow).length === task?.slides.length ? (
    <Redirect
      to={{
        pathname: `/${id}/project/${task?.projectId}/slide/${task?.slides[0]._id}`,
        state: {
          caseId: caseId,
          tile: task?.slides[0].awsImageBucketUrl,
          viewerId: task?.slides[0]._id,
          projectId: task?.projectId,
          questionnaire: questionnaire,
        },
      }}
    />
  ) : (
    <Flex justify="center" align="center" h="100vh">
      <Spinner color="#3965C5" size="xl" thickness="4px" speed="0.65s" />
    </Flex>
  );
};

export default ViewerRedirect;
