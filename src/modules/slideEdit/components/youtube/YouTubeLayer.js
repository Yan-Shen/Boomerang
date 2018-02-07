import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import YouTubeSearch from '../overlayComponents'
import YouTubeCurrentVideo from './YouTubeCurrentVideo'

const YouTubeLayer = (props) => {
	const slide = props.currentSlide
	console.log(slide)
	return (
		<div>
				{slide.youtubeVideo ?
					<YouTubeCurrentVideo currentSlide={props.currentSlide} /> :
					<YouTubeSearch currentSlide={props.currentSlide} />
				}
		</div>
	)
}

function mapStateToProps(state){
	const slides = state.lesson.slides
  return {
    displayObject: state.studentLesson.displayObject,
    currentSlide: slides[state.lesson.currentSlide],
  };
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchLessons, createLesson, deleteLesson,changePanel}, dispatch);
// }

export default connect(mapStateToProps)(YouTubeLayer);
