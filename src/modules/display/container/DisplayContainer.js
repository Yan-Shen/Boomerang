import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { QAContainer, InputQContainer, ReplContainer, QAOutputContainer, ReplOutputContainer } from '../index';
import { toggleChoice, toggleInput, toggleRepl, shareReplSolution, shareReplQ, shareReplQDispatcher, shareReplSolutionDispatcher, shareChoiceQADispatcher} from '../../../store';
import ToggleChoice from '../../tools/reducers/ToggleChoice'



class DisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const {choiceStatus, inputStatus, replStatus, currentSlideId, toggleChoice, toggleInput, toggleRepl, choiceShowStatus, showChoice, selectedTools, replShowStatus, shareReplSolution, shareReplQ} = this.props;
    let choiceQA, replQA

      if(selectedTools && selectedTools["Choice Q"] && selectedTools["Choice Q"]['QA']){
        choiceQA =selectedTools["Choice Q"]['QA']
      } else {
        choiceQA = {}
      }

      let choiceArray = []
      for (let key in choiceQA) {
        let obj = {}
        obj[key]= choiceQA[key]
       choiceArray.push(obj)
      }

      (selectedTools["Repl"]&&selectedTools["Repl"]['QA']) ? replQA = Object.values(selectedTools["Repl"]['QA']) : replQA = []

    if(!Object.keys(selectedTools)[0]) {
      return <div></div>
    } else {
      return (
        <div>
          hjjhjhkjhjk
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
            choiceArray.map(choiceEach=> {
              const [value] = Object.values(choiceEach)
              const [qaId] = Object.keys(choiceEach)
              return <QAOutputContainer
              role ="teacher"
              QA={value}
              key= {qaId}
              qaId = {qaId}
              // QAID= {each.key}
              currentSlideId = {currentSlideId}
              shareChoiceQADispatcher = {shareChoiceQADispatcher}
              key={value.question}/>
            })
          }

          {
            replShowStatus && replQA.map(each=>{
              return <ReplOutputContainer
              QA={each}
              repl = {replShowStatus}
              shareReplSolution = {shareReplSolution}
              shareReplQ= {shareReplQ}
              currentSlideId = {currentSlideId}
              key={each.question}/>
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
    shareReplSolution(slideId, solution){
      dispatch(shareReplSolutionDispatcher(slideId, solution))
    },
    shareReplQ(slideId, question){
      dispatch(shareReplQDispatcher(slideId, question))
    },
    shareChoiceQADispatcher(slideId, QA) {
      dispatch(shareChoiceQADispatcher(slideId, QA))
    }
  }
}

export default connect(mapState, mapDispatcher)(DisplayContainer);
