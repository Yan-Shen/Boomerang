import React, { Component } from 'react';
import ToolsTabsContainer from './ToolsTabsContainer'
import DisplayContainer from './DisplayContainer'
import FaceContainer from './generic_container/FaceContainer'
import HotSpotContainer from './generic_container/HotSpotContainer'
import NameContainer from './generic_container/NameContainer'
import TeacherControls from '../../whiteboard/components/TeacherControls'

class MainDisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: "default" }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(select){
    this.setState({selectedTab: select})
  }

  render() {    const selectedTab = this.state.selectedTab
    return (
    <div style={{width:"330px", height: "750px"}}>
      <ToolsTabsContainer handleChange={this.handleChange}/>
      {
        (selectedTab === "default") && <DisplayContainer />
      }

      {
        (selectedTab === "Name") && <NameContainer />
      }

      {
        (selectedTab === "Face") && <FaceContainer />
      }

      {
        (selectedTab === "HotSpot") && <HotSpotContainer />
      }

      {
        (selectedTab === "WhiteBoard") && <TeacherControls />
      }

    </div>
  )
  }
}

export default MainDisplayContainer;
