import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
// import ItemTypes from '../ItemTypes'
import {connect} from 'react-redux'
// import {addTool} from '../store'
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {showChoice} from '../reducers/ChoiceShow'

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
  constructor(props){
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(){
    if (this.props.name === "Choice Q"){
      this.props.showChoice()
    } else if (this.props.name === "Repl") {
      console.log('toggle is triggered--------------')
      this.props.showReplDispatcher(this.props.currentSlideId)
    }
  }

  render() {
    const {onClick, choiceStatus, inputStatus, replStatus, name, showChoice, showReplDispatcher} = this.props
    let btnStyle

    if (choiceStatus || inputStatus || replStatus) {
      btnStyle = styles.btnOn
    } else {
      btnStyle = styles.btnOff
    }

    return (

      <div className="flex-container-row singleToolContainer">
        <Toggle
          onToggle={this.handleToggle}
        style={styles.toggle}/>
        <RaisedButton
        label={name}
        labelStyle={styles.lable}
        buttonStyle = {btnStyle}
        className="toolBtn"
        onClick={onClick}
        />
      </div>

    )
  }
}

export default ToolBtn;
