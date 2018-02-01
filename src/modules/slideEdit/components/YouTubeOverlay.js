import React from 'react';
import YouTubeDisplay from './overlayComponents'

const YouTubeOverlay = (props) => (
	// <div>Hello</div>
	<YouTubeDisplay currentSlide={props.currentSlide} changeYouTube={props.changeYouTube}/>
);

export default YouTubeOverlay;
