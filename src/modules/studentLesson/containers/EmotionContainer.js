import React, { Component } from 'react';
import EmotionWrapper from '../components/EmotionWrapper';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addEmotionThunk} from '../actions'

class EmotionContainer extends Component {
	render() {
		return (
			<EmotionWrapper {...this.props}/>
		);
	}

}
function mapStateToProps(state){
  const slides = state.lesson.slides
  return {
    lesson: state.lesson
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addEmotionThunk}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EmotionContainer);
