import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {fetchLesson, unmountLesson, addEmotionThunk, addStudentCode} from '../actions'
import {getSubscribers} from '../../slideEdit/actions'
import LessonWrapper from '../components/LessonWrapper'

class StudentLesson extends Component {
  componentDidMount(){
    const id = this.props.match.params.lessonId
    this.props.fetchLesson(id)
  }
  componentWillUnmount(){
    console.log("unmounted!!!!!!")
    this.props.unmountLesson()
  }
  render() {
    if(!this.props.currentSlide) {
      return <div>loading....</div>
    } else {
      console.log('this.props.currentSlide-----------',this.props.whiteboard)
      return (
        <DragDropContextProvider backend={HTML5Backend}>
          <LessonWrapper {...this.props}/>
        </DragDropContextProvider>
      );
    }
  }
}
function mapStateToProps(state){
  const slides = state.lesson.slides

  return {
    subscribers: state.lesson.subscribers,
    currentSlideIndex: state.lesson.currentSlide,
    currentSlide: slides[state.lesson.currentSlide],
    selectedTools: state.selectedTools,
    lesson: state.lesson.lessonData,
    replSolution: state.replSolution,
    emotions: state.studentLesson.emotions,
    displayObject: state.studentLesson.displayObject,         // coming from huge object in the action when fetching lesson
    userId: state.user.uid,
    currentUser: state.user,
    users: state.lesson.users,
    activeUsers: state.lesson.active,
    whiteboard: state.lesson.whiteboard
    // selectedUserId: "hS74ejiqshRiikMYiVla8qLqBEH2"

  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getSubscribers,fetchLesson,unmountLesson,addEmotionThunk, addStudentCode}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentLesson);
