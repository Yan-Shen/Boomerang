import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'

class Whiteboard extends Component {
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
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Whiteboard);
