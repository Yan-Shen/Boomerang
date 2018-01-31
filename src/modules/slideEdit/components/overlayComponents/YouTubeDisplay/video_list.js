import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem 
        onVideoSelect={props.onVideoSelect}
        key={video.etag} 
        video={video} />
    );
  });
    
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}} className="col-md-4 list-group"> 
      {videoItems}
    </div>
  );
};

export default VideoList;