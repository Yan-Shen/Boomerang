import {db} from '../../../../../firebase'
import StudentDisplay from '../../../../studentLesson/components/StudentDisplay';
// import { shareReplSolution, shareReplQ } from '../../../store/index';

// ACTION TYPE
const YOUTUBE_SHOW = 'YOUTUBE_SHOW'

// ACTION MAKER
export const showYouTube = ()=> {
  return {
    type: YOUTUBE_SHOW,
    bool: 'show'
  }
}

export const showYTDispatcher = (slideId, videoId, bool) => {
  return dispatch => {
    db.ref(`/studentDisplay/${slideId}`).once('value')
      .then(data => {
        const studentDisplay = data.val()
        console.log('data is-----------', data.val())
        // if (!studentDisplay || !studentDisplay['YouTube'] || !studentDisplay['YouTube']['show'] || !videoId) {
        //   db.ref(`/studentDisplay/${slideId}/YouTube`).update({show: bool})
        // }
        if (!studentDisplay || !studentDisplay['YouTube'] || !studentDisplay['YouTube']['show'] || !studentDisplay['YouTube']['videoId']) {
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({show: bool})
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({videoId})
        } else {
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({show: bool})
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({videoId: ''})
        }
        dispatch(showYouTube())
      })
    }
  }

//REDUCER

export default function reducer (state = false, action) {
  switch (action.type) {
    case YOUTUBE_SHOW:
      return !state;
      default:
      return state;
  }
}
