import React, { Component } from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchLessons,createLesson,deleteLesson} from '../actions'


import Dashboard from '../components/Dashboard'

class TeacherDashboard extends Component {
  componentDidMount(){
    this.props.fetchLessons()
  }
  render() {
    return (
        <Dashboard {...this.props}/>
    );
  }
}
function mapStateToProps(state){
  return {
    lessonList: state.lessonList
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLessons, createLesson, deleteLesson}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherDashboard);
