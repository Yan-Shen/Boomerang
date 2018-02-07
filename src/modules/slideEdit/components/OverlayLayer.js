import React from 'react';
import YouTubeSearch from './overlayComponents'
import YouTubeCurrentVideo from './overlayComponents/YouTubeCurrentVideo'

const OverlayLayer = (props) => (
	<div>
			YouTube Search
			<YouTubeCurrentVideo currentSlide={props.currentSlide} />
			<YouTubeSearch currentSlide={props.currentSlide} changeYouTube={props.changeYouTube} />
	</div>
);

export default OverlayLayer
