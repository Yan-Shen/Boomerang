import React, { Component } from 'react';
import YouTube from 'react-youtube'
import _ from 'lodash'


class YouTubeVideo extends Component {
	constructor(props) {
		super(props);
		this.onReady = this.onReady.bind(this)
		this.player = null
	}
	onReady(event) {
		this.player = event.target
	}
	componentDidUpdate(prevProps){
		if(this.props.currentSlide.youtubeVideo){
			if(!_.isEqual(prevProps.currentSlide.youtubeVideo,this.props.currentSlide.youtubeVideo)){
				switch (this.props.currentSlide.youtubeVideo.YTObj.data) {
								case -1:
									this.player.stopVideo()
									break
								case 1:
									this.player.playVideo()
									break
								case 2 || 3:
									this.player.pauseVideo()
									break
								case 0:
									this.player.stopVideo()
									break
								case 5:
									this.player.stopVideo()
									break
								default:
									this.player.stopVideo()
									break
							}
			}
		}

	}
	render() {
		const opts = {
				// this is where height and width will go for YT student view!
				playerVars: {
					controls: 0,
					rel: 0,
					disablekb: 0,
					enablejsapi: 1,
					showinfo: 0,
					autohide: 1
					// 'fs' : 0
				}
			}
		const {currentSlide} = this.props
		const {youtubeVideo} = currentSlide
		return (
			<div style={{position: 'relative', marginTop: '20px',marginLeft: '20px', width: '97%', height: "920px" }}>
				<YouTube id="student-youtube-video" videoId={youtubeVideo.videoId} onReady={this.onReady} opts={opts}/>
				<div style={{position: 'absolute', top: 0, left: 0, marginLeft: '20px', height: "920px", width: "97%"}}></div>
			</div>

		);
	}

}

export default YouTubeVideo;
