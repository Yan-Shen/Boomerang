import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import NameGenerator from '../../components/output_components/NameGenerator';



class NameContainer extends Component {
  render() {
    return (
      <NameGenerator {...this.props}/>
    )
  }
}

function mapStateToProps(state,props){
  const slides = state.lesson.slides
  return {
    subscribers: state.lesson.subscribers,
    session: state.lesson.session,
    lesson: state.lesson.lessonData,
    users: state.lesson.users,
    activeUsers: state.lesson.active
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NameContainer);
