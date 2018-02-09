import React, { Component } from 'react';
import YouTube from 'react-youtube';
import {RaisedButton} from 'material-ui';
import {selectYoutube} from './actions'


class YouTubeCurrentVideo extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    const { currentSlide } = this.props
    const {videoId} = currentSlide.youtubeVideo
    return (
      <div style={{marginTop: "20px"}}>
        <YouTube
          id="youtube-video"
          videoId={videoId}
  				onStateChange={(event) => {
  					let YTObj = {
  						data: event.data,
  						time: event.target.getCurrentTime()
  					}
  					selectYoutube(this.props.currentSlide.id, videoId, true, YTObj)
  				}}
        />

        <RaisedButton style={{margin: "10px",width: "300px"}} labelStyle={{color: 'white', marginTop: "10px", fontSize: "25px"}} primary={true} onClick={()=>{selectYoutube(this.props.currentSlide.id, null,false)}}>Remove</RaisedButton>
      </div>


    );
  }
}


 export default YouTubeCurrentVideo;
