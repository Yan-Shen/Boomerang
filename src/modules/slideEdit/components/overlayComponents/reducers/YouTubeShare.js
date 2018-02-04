import {db} from '../../../../../firebase'
import StudentDisplay from '../../../../studentLesson/components/StudentDisplay';
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
  console.log('share videoId---------', videoId)
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