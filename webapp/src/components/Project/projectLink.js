import React, { useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { generatePath, useHistory } from "react-router";
import { Link as RouteLink } from "react-router-dom";
import Project from "./project";

const ProjectLink = ({ projectName, projectId ,displayAvatarColumn}) => {
  const { user } = useAuth0();
  const history = useHistory();
  const id = user?.sub.substring(user?.sub.indexOf("|") + 1);

  // const handleProceed = () => {
  //   const id = user?.sub.substring(user?.sub.indexOf("|") + 1);
  //   history.push(generatePath("/dashboard/:id/:projectId", { id, projectId }));
  // };
  const handleClick = () => {
    return <Project projectName={projectName} projectId={projectId} displayAvatarColumn={displayAvatarColumn}/>;
  };

  return (
    <>
      <Link
        as={RouteLink}
        to={{
          pathname: `/${id}/project/${projectId}`,
          state: { projectId: projectId },
        }}
      >
        {projectName}
      </Link>
    </>
  );
};

export default ProjectLink;
