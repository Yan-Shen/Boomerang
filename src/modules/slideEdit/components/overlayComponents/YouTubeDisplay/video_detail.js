import React from 'react';

const VideoDetail = ({url}) => {

  return (

      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
      </div>
  );
};

export default VideoDetail;