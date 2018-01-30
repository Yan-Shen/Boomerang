import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'

class StudentDashboard extends Component {
  render() {
    return (
        <Dashboard />
    );
  }
}
// function mapStateToProps(state){
//   return {
//     currentSlideIndex: state.lesson.currentSlide,
//     currentSlide: slides? slides[state.lesson.currentSlide] : {},
//     lesson: state.lesson.lesson
//   };
// }

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchLesson}, dispatch);
// }

export default connect(null,null)(StudentDashboard);
