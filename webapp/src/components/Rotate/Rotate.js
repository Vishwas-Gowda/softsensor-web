import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToolbarButton from "../ViewerToolbar/button";
import {IoMdRefresh} from 'react-icons/io';

const Rotate = ({ viewerId }) => {
  const { viewerWindow } = useSelector((state) => state.fabricOverlayState);
  const { viewer } = viewerWindow[viewerId];

  const handleRotate = (e) => {
    
    try {
            if ( viewer.viewport ) {
                var currRotation = viewer.viewport.getRotation();
                  currRotation =(currRotation + 90);
                viewer.viewport.setRotation(currRotation);
            }
    } catch (e) {
      console.error("Error handling rotate button click", e);
    }
  };


  return (
<ToolbarButton
      icon={<IoMdRefresh  size={20} color="#151C25"/>}
      _isActive={{bgColor:"red"}} 
      label="Type Text"
      onClick={handleRotate}
      title="Rotate"
    />

  );
};

export default Rotate;
