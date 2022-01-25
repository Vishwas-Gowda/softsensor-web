import React from 'react';
import { Box, Flex, Button, Text, Image,Icon } from "@chakra-ui/react";
import {BsGrid3X3Gap,BsChatText,BsChatLeftText} from 'react-icons/bs';
import {BiScreenshot} from 'react-icons/bi';
import {MdOutbox} from 'react-icons/md';
import {GrMoreVertical} from 'react-icons/gr';
import {FiCamera,FiDownload} from 'react-icons/fi'
import {RiShareForwardLine,RiFullscreenFill} from 'react-icons/ri'
import ToolbarButton from "../ViewerToolbar/button";
import SlideChat from '../Chat/chat';
import ShareLink from '../Share/shareLink';
import Fullscreen from '../Fullscreen/Fullscreen';

function ScreenTools({viewerId}) {
    return (
        <>
        <Flex px="20px" borderRight="2px solid #E4E5E8" height="18px" alignItems="center">

            
            {/* Add respective tools */}

            <ToolbarButton
            icon={<BsGrid3X3Gap size={18} color='#151C25'/>}
            title="Grid"
          />
          <ToolbarButton
            icon={<MdOutbox size={18} color='#151C25'/>}
            title="WSI"
          />
          <ToolbarButton
          icon={<BiScreenshot size={18} color='#151C25'/>}
          title="Screenshot"
        />
        <Fullscreen viewerId={viewerId}/>
         <ToolbarButton
          icon={<FiDownload size={18} color='#151C25'/>}
          title="Download"
        />
        
        <SlideChat />
        <ShareLink />
        </Flex>
        <Icon as={GrMoreVertical} size={18}  ml="20px" mr="30px" color="#151C25"/>
        </>
    )
}

export default ScreenTools
