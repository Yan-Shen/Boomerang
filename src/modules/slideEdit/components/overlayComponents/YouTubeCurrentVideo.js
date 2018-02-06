import React, { Component } from 'react';

class YouTubeCurrentVideo extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    const { currentSlide } = this.props
    return (
      <div id='video-overlay' style={{zIndex: !this.props.currentSlide.youtubeVideo ? -5000 : 5000, marginTop: '30px', position: 'absolute', top: 0, left: 0, width: this.block ? this.block.clientWidth : "0px", height: this.block ? this.block.clientHeight : "0px"}}>
      </div>
    );
  }
}


 export default YouTubeCurrentVideo;
