import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'
import {fetchLessons} from '../../teacherDashboard/actions'

class StudentDashboard extends Component {
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
  return bindActionCreators({fetchLessons}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentDashboard);
