import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
// import ItemTypes from '../ItemTypes'
import {connect} from 'react-redux'
// import {addTool} from '../store'
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
    width: '25%',
  },
  btn: {
    fontSize: "13px",
    paddingLeft: "5px",
    paddingRight: "5px"
  }
};

class ToolBtn extends Component {
  render() {
    return (

      <div className="flex-container-row singleToolContainer">
        <Toggle
          // style={styles.toggle}
        style={styles.toggle}/>
        <RaisedButton label={this.props.name} labelStyle={styles.btn} className="toolBtn" onClick={this.props.onClick}/>
      </div>

    )
  }
}

export default ToolBtn;
