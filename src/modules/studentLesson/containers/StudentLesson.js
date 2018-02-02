import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {fetchLesson,unmountLesson} from '../actions'
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
      console.log('this.props.currentSlide-----------',this.props.currentSlideIndex)
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
  // const displayObject = state.studentLesson.displayObject.find(obj=> obj.id===slides[state.lesson.currentSlide].id)
  // console.log('displayObject is---------', state.studentLesson.displayObject)
  // console.log('slides is---------', slides)
  // console.log('state.lesson.currentSlide is---------', slides[state.lesson.currentSlide])

  return {
    currentSlideIndex: state.lesson.currentSlide,
    currentSlide: slides[state.lesson.currentSlide],
    lesson: state.lesson.lessonData,
    replSolution: state.replSolution,
    emotions: state.studentLesson.emotions,
    displayObject: state.studentLesson.displayObject
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLesson,unmountLesson}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentLesson);
