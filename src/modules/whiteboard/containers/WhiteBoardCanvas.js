import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Canvas from '../components/Canvas'

class WhiteboardCanvas extends Component {
  componentDidMount(){

  }
  render() {
    return (
        <Canvas {...this.props}/>
    );
  }
}
function mapStateToProps(state){
  return {
    penWidth: state.whiteboard.width,
    color: state.whiteboard.color
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(WhiteboardCanvas);
