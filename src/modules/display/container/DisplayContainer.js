import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { QAContainer, InputQContainer, ReplContainer, QAOutputContainer } from '../index';
import { toggleChoice, toggleInput, toggleRepl} from '../../../store';


class DisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {

    const {choiceStatus, inputStatus, replStatus, currentSlideId, toggleChoice, toggleInput, toggleRepl, choiceShowStatus, showChoice, selectedTools} = this.props;
    if(!Object.keys(selectedTools)[0]) {
      return <div>loading...</div>
    } else {
      const replQ = Object.values(selectedTools["Repl"]['QA'])
      const choiceQA = Object.values(selectedTools["Choice Q"]['QA'])
      console.log('choiceQA----------', choiceQA)
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
          {
            choiceShowStatus &&
            <QAOutputContainer QA={choiceQA}/>
          }
        </div>
       )
    }

  }
}


const mapState = state => {
  const slides = state.lesson.slides
  return {
    choiceStatus: state.toggleChoice,
    inputStatus: state.toggleInput,
    replStatus: state.toggleRepl,
    currentSlideId: slides[state.lesson.currentSlide].id,
    selectedTools: state.selectedTools,
		choiceShowStatus: state.choiceShow,
  }
}

function mapDispatcher(dispatch){
  return bindActionCreators({toggleChoice, toggleInput, toggleRepl}, dispatch);
}

export default connect(mapState, mapDispatcher)(DisplayContainer);
