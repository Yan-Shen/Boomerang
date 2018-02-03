import {db} from '../../../../../firebase'
// ACTION TYPE
const YOUTUBE_SHARE = 'YOUTUBE_SHARE'

// ACTION MAKER
export const shareYouTube = (videoId)=> {
  return {
    type: YOUTUBE_SHARE,
    videoId: videoId
  }
}

export const shareYTDispatcher = (slideId, videoId) =>
{
  console.log('slideid---------', videoId)
  return dispatch => {
      db.ref(`/studentDisplay/${slideId}/YouTube`).update({videoId})
      .then(()=>{
        dispatch(shareYouTube(videoId))
      })
    }
  }

//REDUCER

export default function reducer (state = '', action) {
  switch (action.type) {
    case YOUTUBE_SHARE:
      return action.videoId;
      default:
      return state;
  }
}