import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateSlide} from '../actions'
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

function clearPaths(data){
  const objects = data.objects
  const newObjects = data.objects.map(object => {
    object.fill = null
    return object
  })
  data.objects = newObjects
  return data
}
function mapStateToProps(state){
  const slides = state.lesson.slides
  return {
    penWidth: state.whiteboard.width,
    color: state.whiteboard.color,
    currentSlide: slides[state.lesson.currentSlide],
    whiteboardData: clearPaths(slides[state.lesson.currentSlide].whiteboard),
    whiteboard: state.lesson.whiteboard
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({updateSlide}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(WhiteboardCanvas);
