import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchLesson} from '../actions'
import LessonWrapper from '../components/LessonWrapper'

class StudentLesson extends Component {
  componentDidMount(){
    const id = this.props.match.params.lessonId
    this.props.fetchLesson(id)
  }
  render() {
    if(!this.props.currentSlide) return <div>loading....</div>
    console.log(this.props.currentSlideIndex)
    return (
        <LessonWrapper {...this.props}/>
    );
  }
}
function mapStateToProps(state){
  const slides = state.lesson.slides
  return {
    currentSlideIndex: state.lesson.currentSlide,
    currentSlide: slides[state.lesson.currentSlide],
    lesson: state.lesson.lesson
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLesson}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentLesson);
