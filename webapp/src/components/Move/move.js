import { React,useEffect,useState } from "react";
import { BsArrowsMove,BsCircleHalf } from "react-icons/bs";
import { RiNavigationFill ,RiPencilRulerLine } from "react-icons/ri";
import {AiOutlineSliders} from 'react-icons/ai';
import ToolbarButton from "../ViewerToolbar/button";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../state/reducers/fabricOverlayReducer";
import { Flex ,Box} from "@chakra-ui/react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Rotate from "../Rotate/Rotate";
import TypeTools from "../AdjustmentBar/typeTools";
import { useMediaQuery } from "@chakra-ui/media-query";
import { fabric, initFabricJSOverlay } from "openseadragon-fabricjs-overlay";

const Move = ({ viewerId }) => {

  const [ifBiggerScreen] = useMediaQuery("(min-width:2000px)");
  const { activeTool,viewerWindow } = useSelector((state) => state.fabricOverlayState); 
  const { viewer } = viewerWindow[viewerId];
  const dispatch = useDispatch();
  const [typeToolsToggle, setTypeToolsToggle] = useState(false);
  const [selectState,setSelectState] =useState(2);
  const isSelect= activeTool === "Select";
  const isMove= activeTool === "Move";

  const handleSelectClick = () => {
    setSelectState(1)
    dispatch(updateTool({ tool: isSelect ? "" : "Select" }));
    viewer.panVertical = false;
    viewer.panHorizontal =false;
    fabric.Object.prototype.set({
      hasControls:false,
      lockMovementX:true,
      lockMovementY:true,
      evented:true
    })
  };
  
  const handleMoveClick = () => {
    setSelectState(2)
    dispatch(updateTool({ tool: isMove ? "" : "Move" }));
    viewer.panVertical = true;
    viewer.panHorizontal =true;
  }
  const handleAnnotationsClick = () => {
    setTypeToolsToggle(typeToolsToggle => !typeToolsToggle);
  };
  return (
    <Flex direction="column" >
    <Flex alignItems="center" mx="16px" >
      <ToolbarButton
        icon={<RiNavigationFill size={18} color="#151C25"/>}
        title="Select"
        backgroundColor={selectState===1? "#E4E5E8" : ""}
        onClick={handleSelectClick}
      />
      <ToolbarButton
        icon={<BsArrowsMove   size={18} color="#151C25"/>}
        title="Move"
        backgroundColor={selectState===2? "#E4E5E8" : ""}
        onClick={handleMoveClick}
      />
      <Rotate viewerId={viewerId}/>
      <ToolbarButton
      icon={<HiOutlinePencilAlt size={18} color='#151C25'/>}
      backgroundColor={typeToolsToggle ? "#E4E5E8" : ""}
      title="Annotations"
      onClick={handleAnnotationsClick}
      />
      
      <ToolbarButton
      icon={<AiOutlineSliders size={18} color='#151C25'/>}
      title="Filters"
      />
      <ToolbarButton
      icon={<BsCircleHalf size={18} color='#151C25'/>}
      title=""
      />
      <ToolbarButton
      icon={<RiPencilRulerLine size={18} color='#151C25'/>}
      title=""
      />
    </Flex>
    <Flex ml={ifBiggerScreen ? "100px" :""}>
    {typeToolsToggle ? (
          <TypeTools
            viewerId={viewerId}
            typeToolsButtonHandler={setTypeToolsToggle}
          />
        ) : (
          ""
        )}
    </Flex>
    </Flex>
  );
};

export default Move;
