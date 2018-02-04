import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toggleActiveStudent,fetchLesson,addSlide,deleteSlide,changeSlide,updateSlide,unmountLesson,changeYouTube} from "../actions";
import {getToolsDispatcher, showYTDispatcher } from '../../../store'
import SlideEditWrapper from '../components/SlideEditWrapper'
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase'
import components from '../components'
import {ToolContainer} from '../../tools'
import {DisplayContainer} from '../../display'
import ReplSolution from '../../display/components/input_components/ReplSolution'
import ReplQuestion from '../../display/components/input_components/ReplQuestion';
import {shareReplSolutionDispatcher} from '../../display/reducers/replSolutionShare'



class SlideEdit extends Component {
  componentDidMount(){
    const id = this.props.match.params.lessonId
    this.props.fetchLesson(id)
  }

  // componentDidUpdate(prevProps){
	// 	if (!prevProps.slides.length && this.props.slides.length) {
  //       this.props.getToolsDispatcher(this.props.slides[0].id)
	// 	}
  // }

  componentWillUnmount(){
    console.log("unmounted!!!!!!")
    this.props.unmountLesson()
  }

  render() {
    if (!this.props.currentSlide) {
      return (<div>Loading...</div>)
    }
    console.log('online users', this.props.users)
    return (
        <div style={{display: 'flex',width: '100vw'}}>
          <SlideEditWrapper {...this.props}/>
        </div>
    );
  }
}

function mapStateToProps(state,props){
  const slides = state.lesson.slides
  return {
    currentSlideIndex: state.lesson.currentSlide,
    currentSlide: slides[state.lesson.currentSlide],
    slides: state.lesson.slides,
    lesson: state.lesson.lessonData,
    replSolution: state.replSolution,
    replQuestion: state.replQuestion,
    replShow: state.replShow,
    choiceShow: state.choiceShow,
    displayObject: state.studentLesson.displayObject,
    selectedUserId: "hS74ejiqshRiikMYiVla8qLqBEH2",
    users: state.lesson.users,
    activeUsers: state.lesson.active
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleActiveStudent,fetchLesson,addSlide,deleteSlide,changeSlide,updateSlide, getToolsDispatcher,unmountLesson,changeYouTube, shareReplSolutionDispatcher, showYTDispatcher}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SlideEdit);
