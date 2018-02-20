import React, { Component } from 'react';
import VideoListItem from './video_list_item';

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null
    };
    this.handleIndex = this.handleIndex.bind(this)
  }
  handleIndex(index){
    this.setState({index: index === this.state.index ? null : index})
  }
  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}} className="col-md-4 list-group">
        {this.props.videos.map((video,index) => {
          if(index <=3){
            return (
              <VideoListItem
                onVideoSelect={this.props.onVideoSelect}
                handleIndex={this.handleIndex}
                key={video.etag}
                video={video}
                index={index}
                activeIndex={this.state.index}
              />
            );
          }
          else {return null}
        })}
      </div>
    );
  }
}




export default VideoList;
