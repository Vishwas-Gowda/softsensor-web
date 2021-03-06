import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetNewProject } from "../../state/reducers/newProjectReducer";
import "../../styles/newproject.css";
import { Box, Button, Radio, RadioGroup, Text, Input } from "@chakra-ui/react";

const Questionnaire = () => {
  const [activeOption, setActiveOption] = useState("questionnaire");
  const { projectDetails } = useSelector((state) => state.newProjectState);
  const dispatch = useDispatch();

  return (
    <>
      <Text
        style={{
          position: "absolute",
          left: "20px",
          top: "106px",
          fontSize: "14px",
          color: "#2E519E",
        }}
      >
        Project type
      </Text>
      {activeOption === "questionnaire" && projectDetails.slide_type === "H&E" && (
        <>
          <Text
            style={{
              position: "relative",
              left: "20px",
              fontWeight: "500",
              fontSize: "20px",
              color: "#2E519E",
              top: "100px",
            }}
          >
            H&E Slides
          </Text>
          <Box className="questions_div">
            <Text>Q.1 Biopsy adequacy</Text>
            <RadioGroup style={{ paddingLeft: "150px" }}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no" style={{ marginLeft: "50px" }}>
                No
              </Radio>
            </RadioGroup>
          </Box>
          <Box className="questions_div" style={{ marginTop: "40px" }}>
            <Text style={{ paddingLeft: "30px" }}>If No, indicate why?</Text>
            <RadioGroup>
              <Radio value="Not in Focus" style={{ marginLeft: "130px" }}>
                Not in Focus
              </Radio>
              <Radio value="Faded/Poor stain" style={{ marginLeft: "18.5px" }}>
                {" "}
                Faded/Poor stain
              </Radio>
              <Radio value="other" style={{ marginLeft: "30px" }}>
                other
              </Radio>
              <br />
              <Box>
                <Text paddingLeft={160} paddingTop={3}>
                  Other:
                  <Input
                    w={400}
                    marginLeft="4px"
                    className="questionnaire_input"
                  ></Input>
                </Text>
              </Box>
            </RadioGroup>
          </Box>
          <Text
            style={{
              paddingLeft: "18px",
              paddingTop: "265px",
              color: "#2e519e",
            }}
          >
            NAFLD Activity Score(NAS)
          </Text>
          <Box className="questions_div" style={{ marginTop: "180px" }}>
            <Text>Q.1 Steatosis</Text>
            <RadioGroup>
              <Radio
                value="steatosis_less_than_five"
                style={{ marginLeft: "143px" }}
              >
                {"<"} 5%
              </Radio>
              <Radio
                value="steatosis_between_five_and_thirtythree"
                style={{ marginLeft: "55px" }}
              >
                5-33%
              </Radio>
              <Radio
                value="steatosis_between_thirtyfour_and_sixtysix"
                style={{ marginLeft: "66px" }}
              >
                34-66%
              </Radio>
              <Radio
                value="steatosis_more_than_sixtysix"
                style={{ marginLeft: "60px" }}
              >
                {">"} 66%
              </Radio>
            </RadioGroup>
          </Box>
          <Box className="questions_div" style={{ marginTop: "210px" }}>
            <Text>Q.2 Lobular inflamation</Text>
            <RadioGroup>
              <Radio
                value="lobular_inflammation_none"
                style={{ marginLeft: "74px" }}
              >
                None
              </Radio>
              <Radio
                value="lobular_inflammation_less_than_two"
                style={{ marginLeft: "53px" }}
              >
                {"<"} 2 / 20x mag
              </Radio>
              <Radio
                value="lobular_inflammation_between _two_and_four"
                style={{ marginLeft: "14px" }}
              >
                2-4 / 20x mag
              </Radio>
              <Radio
                value="lobular_inflammation_more_than_four"
                style={{ marginLeft: "17px" }}
              >
                {">"} 4 / 20x mag
              </Radio>
            </RadioGroup>
          </Box>
          <Box className="questions_div" style={{ marginTop: "240px" }}>
            <Text>Q.3 Hepatocellular ballooning</Text>
            <RadioGroup>
              <Radio
                value="hepatocellular_ballooning_none"
                style={{ marginLeft: "28px" }}
              >
                None
              </Radio>
              <Radio
                value="hepatocellular_ballooning_few"
                style={{ marginLeft: "55px" }}
              >
                Few
              </Radio>
              <Radio
                value="hepatocellular_ballooning_many"
                style={{ marginLeft: "80px" }}
              >
                Many
              </Radio>
            </RadioGroup>
          </Box>
        </>
      )}

      {activeOption === "questionnaire" &&
        projectDetails.slide_type === "Trichrome" && (
          <>
            <Text
              style={{
                position: "absolute",
                left: "20px",
                fontSize: "20px",
                color: "#2E519E",
                top: "135px",
              }}
              fontWeight="semibold"
            >
              Trichrome Slides
            </Text>
            <Box className="questions_div">
              <Text>Q.1 Biopsy adequacy</Text>
              <RadioGroup style={{ paddingLeft: "150px" }}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no" style={{ marginLeft: "50px" }}>
                  No
                </Radio>
              </RadioGroup>
            </Box>
            <Box className="questions_div" style={{ marginTop: "40px" }}>
              <Text style={{ paddingLeft: "30px" }}>If No, indicate why?</Text>
              <RadioGroup>
                <Radio value="Not in Focus" style={{ marginLeft: "130px" }}>
                  Not in Focus
                </Radio>
                <Radio
                  value="Faded/Poor stain"
                  style={{ marginLeft: "18.5px" }}
                >
                  {" "}
                  Faded/Poor stain
                </Radio>
                <Radio value="other" style={{ marginLeft: "30px" }}>
                  other
                </Radio>
                <br />
                <Box>
                  <Text paddingLeft={160} paddingTop={3}>
                    Other:
                    <Input width={450} marginLeft={2}></Input>
                  </Text>
                </Box>
              </RadioGroup>
            </Box>
            <Box className="questions_div" style={{ marginTop: "140px" }}>
              <Text>
                Q.2 Biopsy Length :
                <Input
                  variant="flushed"
                  width={300}
                  marginLeft={165}
                  height={5}
                  placeholder="Biopsy length"
                ></Input>
              </Text>
            </Box>
            <Box className="questions_div" style={{ marginTop: "178px" }}>
              <Text>
                Q.3 Number of portal tracts :
                <Input
                  variant="flushed"
                  width={300}
                  marginLeft={105}
                  height={5}
                  placeholder="Number of portal tracts"
                ></Input>
              </Text>
            </Box>
            <Text
              paddingTop={380}
              paddingLeft={18}
              color="#2E519E"
              fontSize={20}
              fontWeight="semibold"
            >
              Fibrosis Stage
            </Text>
            <Box className="questions_div" style={{ marginTop: "280px" }}>
              <Text>Q.1 NASH CRN</Text>
              <RadioGroup>
                <Radio value="nashcrn_none" style={{ marginLeft: "95px" }}>
                  None
                </Radio>
                <Radio
                  value="nashcrn_mid_zone_perisinusoidal"
                  style={{ marginLeft: "40px" }}
                >
                  Mid, Zone 3, Perisinusoidal
                </Radio>
                <Radio
                  value="nashcrn_zone_periportal"
                  style={{ marginLeft: "23px" }}
                >
                  Zone 3 & periportal
                </Radio>
                <Radio value="nashcrn_bridging" style={{ marginLeft: "23px" }}>
                  Bridging
                </Radio>
                <br />
                <Radio value="nashcrn_cirrhosis" marginTop={7} marginLeft={190}>
                  Cirrhosis
                </Radio>
                <Radio
                  value="nashcrn_moderate_zone_perisinusoidal"
                  marginTop={7}
                  marginLeft={54}
                >
                  Moderate, Zone 3, Perisinusoidal
                </Radio>
                <br />
                <Radio
                  value="nashcrn_portal/periportal"
                  marginTop={7}
                  marginLeft={190}
                >
                  Portal / periportal only
                </Radio>
              </RadioGroup>
            </Box>
          </>
        )}
    </>
  );
};

export default Questionnaire;
