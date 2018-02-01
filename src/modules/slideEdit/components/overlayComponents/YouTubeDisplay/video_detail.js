import React from 'react';

const VideoDetail = ({url}) => {

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
      </div>
    </div>
  );
};

export default VideoDetail;