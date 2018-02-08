import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import BuildIcon from 'material-ui/svg-icons/action/build';
import VideoIcon from 'material-ui/svg-icons/av/videocam';
import WhiteBoardIcon from 'material-ui/svg-icons/action/aspect-ratio';
import HotSpotIcon from 'material-ui/svg-icons/av/album';
import DefaultIcon from 'material-ui/svg-icons/action/home';
import NamesGenIcon from 'material-ui/svg-icons/action/event-seat';

const TabsExampleIcon = (props) => (

  <Tabs inkBarStyle={{backgroundColor: "#007681"}} tabItemContainerStyle={{background: '#6bada7'}} style={{width: "330px"}} onChange={value => props.handleChange(value)}>
    <Tab value="default" icon={<DefaultIcon />} />
    <Tab value="Name" icon={<NamesGenIcon />} />
    <Tab value="Face" icon={<VideoIcon />} />
    <Tab value = "WhiteBoard" icon={<WhiteBoardIcon />} />
  </Tabs>
);

export default TabsExampleIcon;
