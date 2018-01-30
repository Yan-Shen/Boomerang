import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { QAContainer, InputQContainer, ReplContainer } from '../index';
import { toggleChoice, toggleInput, toggleRepl} from '../../../store';

class DisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const {choiceStatus, inputStatus, replStatus, currentSlideId, toggleChoice, toggleInput, toggleRepl} = this.props;

    return (
      <div>
        {
          choiceStatus &&
          <QAContainer
          currentSlideId = {currentSlideId}
          toggleChoice = {toggleChoice}/>
        }
        {
          inputStatus &&
          <InputQContainer
          toggleInput = {toggleInput}
          currentSlideId = {currentSlideId}/>
        }
        {
          replStatus &&
          <ReplContainer
          toggleRepl = {toggleRepl}
          currentSlideId = {currentSlideId}/>
        }
      </div>
     )
  }
}


const mapState = state => {
  const slides = state.lesson.slides
  return {
    choiceStatus: state.toggleChoice,
    inputStatus: state.toggleInput,
    replStatus: state.toggleRepl,
    currentSlideId: slides[state.lesson.currentSlide].id,
  }
}

function mapDispatcher(dispatch){
  return bindActionCreators({toggleChoice, toggleInput, toggleRepl}, dispatch);
}

export default connect(mapState, mapDispatcher)(DisplayContainer);
