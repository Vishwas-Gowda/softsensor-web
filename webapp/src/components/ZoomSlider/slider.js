import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../reactSlider";
import { updateZoomValue } from "../../state/reducers/fabricOverlayReducer";
import { Box, Link, Text } from "@chakra-ui/react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

const ZoomSlider = ({ viewerId }) => {
  const { viewer, zoomValue } = useSelector(
    (state) => state.fabricOverlayState.viewerWindow[viewerId]
  );
  const dispatch = useDispatch();

  const handleSlider = (val) => {
    viewer.viewport.zoomTo(viewer.viewport.getMaxZoom() * val * 2.5 * 0.01);
    dispatch(updateZoomValue({ id: viewerId, value: val }));
  };

  const handleLabel = (val) => {
    viewer.viewport.zoomTo(viewer.viewport.getMaxZoom() * val * 2.5 * 0.01);
    dispatch(updateZoomValue({ id: viewerId, value: val }));
  };


  useEffect(() => {
    if (!viewer) return;
    viewer.addHandler("zoom", (e) => {
      const value = parseInt((e.zoom * 40) / viewer.viewport.getMaxZoom());
      dispatch(updateZoomValue({ id: viewerId, value: value }));
    });
  }, [viewer]);

  const label = ["1", "5", "10", "20", "30", "40"];

  return (
    <Box onChange={(val) => handleSlider(val)}
    valueRenderer={(value) => `${value}%`}
    markersLabel={label}
    viewerId={viewerId}
    mx="15px">
      {/* <Slider
        value={zoomValue}
        valueLabelStyle={{ display: "none" }}
        min={1}
        max={40}
        markers={6}
        stepSize={8}
        fontColor="white"
        grabCursor={false}
        trackLength={100}
        trackShape="squared"
        handlerShape="rounded"
        handlerBorderColor="#3965C6"
        handlerSize={10}
        trackThickness={3}
        fillColor="#3965C6"
        fontSize={10}
        vertical={true}
        fontColor="#6B6B6B"
        markersSize={10}
        markersLabel={label}
        markersLeft="6px"
        onChange={(val) => handleSlider(val)}
        valueRenderer={(value) => `${value}%`}
        viewerId={viewerId}
      /> */}
      <Text  >
    {zoomValue}x
          </Text> 
    </Box>
  );
};

export default ZoomSlider;
