import React from "react";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import TypeButton from "../typeButton";

const GenerateReport = () => {
  return (
    <TypeButton
      icon={<EditIcon color="black" />}
      label="Generate Report"
      backgroundColor="rgba(236, 236, 236, 1)"
      border="0.5px solid rgba(21, 28, 37, 1)"
      title="generate report"
      transform="scale(1.2)"
      pl="2px"
      pb="2px"
    />
  );
};

export default GenerateReport;
