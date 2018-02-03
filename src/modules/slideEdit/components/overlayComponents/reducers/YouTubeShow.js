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

export const showYTDispatcher = (slideId) => {
  return dispatch => {
    db.ref(`/studentDisplay/${slideId}`).once('value')
      .then(data => {
        const studentDisplay = data.val()
        console.log('data is-----------', data)
        if(!studentDisplay.YouTube.show) {
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({show: true})
        } else {
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({show: false})
          // db.ref(`/studentDisplay/${slideId}/YouTube`).update({question: ''})
          // db.ref(`/studentDisplay/${slideId}/YouTube`).update({solution: ''})
          // dispatch(shareReplSolution(''))
          // dispatch(shareReplQ(''))
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
