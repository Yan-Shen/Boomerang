import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
// import ItemTypes from '../ItemTypes'
import {connect} from 'react-redux'
// import {addTool} from '../store'
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

// const styles = {
//   block: {
//     maxWidth: 250,
//   },
//   toggle: {
//     marginBottom: 16,
//   },
//   thumbOff: {
//     backgroundColor: '#ffcccc',
//   },
//   trackOff: {
//     backgroundColor: '#ff9d9d',
//   },
//   thumbSwitched: {
//     backgroundColor: 'red',
//   },
//   trackSwitched: {
//     backgroundColor: '#ff9d9d',
//   },
//   labelStyle: {
//     color: 'red',
//   },
// };
class ToolChoice extends Component {
  render() {
    return (   
    <div>
      <Toggle
        label="Simple"
        // style={styles.toggle} 
      />
      <RaisedButton label={this.props.name} /> 
    
    </div>
    )
  }
}

export default ToolChoice;