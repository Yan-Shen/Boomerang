import React from 'react';
import {teal500, teal400, teal300, grey600} from 'material-ui/styles/colors';
const VideoListItem = ({video, onVideoSelect}) => {
  const imgUrl = video.snippet.thumbnails.default.url
  return (
    <div className="animated fadeInRight" style={{width: '50%'}} onClick={() => onVideoSelect(video)}>
        <div style={{margin: '5px'}}>
          <div style={{fontSize: "20px", fontWeight: 600, margin: "10px", color: teal400}}>{video.snippet.title}</div>
          <img style={{width: "400px"}} className="media-object" src={imgUrl} />
        </div>
    </div>
  )
};

export default VideoListItem;
