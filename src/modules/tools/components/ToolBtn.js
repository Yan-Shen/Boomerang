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
  btnOff: {
    backgroundColor: "white",
  },
  btnOn: {
    background: "radial-gradient(circle, rgb(204, 255, 212), rgb(152, 255, 167), rgb(117, 255, 138))"
  },
  label: {
    fontSize: "13px",
    paddingLeft: "5px",
    paddingRight: "5px"
  }
};

class ToolBtn extends Component {

  render() {
    const {onClick, choiceStatus, inputStatus, replStatus} = this.props
    let btnStyle
    if (choiceStatus || inputStatus || replStatus) {
      btnStyle = styles.btnOn
    } else {
      btnStyle = styles.btnOff
    }

    return (

      <div className="flex-container-row singleToolContainer">
        <Toggle
          // style={styles.toggle}
        style={styles.toggle}/>
        <RaisedButton
        label={this.props.name}
        labelStyle={styles.lable}
        buttonStyle = {btnStyle}
        className="toolBtn"
        onClick={onClick}
        // choicestatus = {choiceStatus}
        // inputstatus = {inputStatus}
        />
      </div>

    )
  }
}

export default ToolBtn;
