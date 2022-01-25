import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToolbarButton from "../ViewerToolbar/button";
import {CgArrowsExpandRight} from 'react-icons/cg';
import {RiShareForwardLine,RiFullscreenFill} from 'react-icons/ri'

const Fullscreen = ({ viewerId }) => {
  const { viewerWindow } = useSelector((state) => state.fabricOverlayState);
  const { viewer } = viewerWindow[viewerId];

  const handleFullScreen = () => {

        if ( viewer.isFullPage() && !viewer.isFullScreen() ) {
            // Is fullPage but not fullScreen
            viewer.setFullPage( false );
        } else {
            viewer.setFullScreen( !viewer.isFullPage() );
        }
    }
  return (

<ToolbarButton
      icon={<RiFullscreenFill size={18} color="#151C25"/>}
      label="Full screen"
      onClick={handleFullScreen}
      title="Full screen"
    />

  );
};

export default Fullscreen;
