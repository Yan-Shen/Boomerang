import {db} from '../../../../../firebase'
import StudentDisplay from '../../../../studentLesson/components/StudentDisplay';

export const showYTDispatcher = (slideId, videoId, bool, YTObj) => {
  return dispatch => {
    db.ref(`/studentDisplay/${slideId}`).once('value')
      .then(data => {
        const studentDisplay = data.val()
        console.log('data is-----------', data.val())
        if (!studentDisplay || !studentDisplay['YouTube'] || !studentDisplay['YouTube']['show'] || !studentDisplay['YouTube']['videoId']) {
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({show: bool})
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({videoId})
        } else {
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({show: bool})
          db.ref(`/studentDisplay/${slideId}/YouTube`).update({videoId})
        }
        
        if (!studentDisplay || !studentDisplay['YouTube'] || !studentDisplay['YouTube']['YTObj']) {
          console.log('YTObj ========================================', YTObj)
          if (YTObj) {
            db.ref(`/studentDisplay/${slideId}/YouTube`).update({YTObj})
          }
        } else {
          if (YTObj) {
            db.ref(`/studentDisplay/${slideId}/YouTube`).update({YTObj})
          }
        }
      })
    }
  }

//REDUCER

export default function reducer (state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
