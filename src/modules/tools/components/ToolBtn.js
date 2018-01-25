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
};

class ToolBtn extends Component {
  render() {
    return (

      <div className="flex-container-row singleToolContainer">
        <Toggle
          // style={styles.toggle}
        style={styles.toggle}/>
        <RaisedButton label={this.props.name} className="toolBtn"/>
      </div>

    )
  }
}

export default ToolBtn;
