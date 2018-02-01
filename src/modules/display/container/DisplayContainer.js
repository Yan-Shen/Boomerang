import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { QAContainer, InputQContainer, ReplContainer, QAOutputContainer, ReplOutputContainer } from '../index';
import { toggleChoice, toggleInput, toggleRepl, shareReplSolution, shareReplQ} from '../../../store';
import ToggleChoice from '../../tools/reducers/ToggleChoice'



class DisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {

    const {choiceStatus, inputStatus, replStatus, currentSlideId, toggleChoice, toggleInput, toggleRepl, choiceShowStatus, showChoice, selectedTools, replShowStatus, shareReplSolution, shareReplQ} = this.props;
    let choiceQA
    let replQA

    if(!Object.keys(selectedTools)[0]) {
      return <div>loading...</div>
    } else {

      if(selectedTools && selectedTools["Choice Q"] && selectedTools["Choice Q"]['QA']){
        choiceQA = Object.values(selectedTools["Choice Q"]['QA'])
      } else {
        choiceQA = []
      }

      (selectedTools["Repl"]&&selectedTools["Repl"]['QA']) ? replQA = Object.values(selectedTools["Repl"]['QA']) : replQA = []
      console.log('replQA---------', replQA)
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
            choiceShowStatus && choiceQA.map(each=>{
              return <QAOutputContainer QA={each} key={each.question}/>
            })
          }
          {
            replShowStatus && replQA.map(each=>{
              return <ReplOutputContainer QA={each} repl = {replShowStatus} shareReplSolution = {shareReplSolution} shareReplQ= {shareReplQ} key={each.question}/>
            })
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
    replShowStatus: state.replShow,
  }
}

function mapDispatcher(dispatch){
  return{
    toggleChoice(){
      dispatch(toggleChoice())
    },
    toggleInput(){
      dispatch(toggleInput())
    },
    toggleRepl(){
      dispatch(toggleRepl())
    },
    shareReplSolution(solution){
      dispatch(shareReplSolution(solution))
    },
    shareReplQ(question){
      dispatch(shareReplQ(question))
    }
  }
}

export default connect(mapState, mapDispatcher)(DisplayContainer);
