import {db} from '../../../firebase'
// import StudentDisplay from '../../studentLesson/components/StudentDisplay';
import { shareReplSolution, shareReplQ } from '../../../store/index';

// ACTION TYPE
const REPL_SHOW = 'REPL_SHOW'

// ACTION MAKER
export const showRepl = ()=> {
  return {
    type: REPL_SHOW,
    bool: 'show'
  }
}

export const showReplDispatcher = (slideId) => {
  return dispatch => {
    db.ref(`/studentDisplay/${slideId}`).once('value')
      .then(data => {
        const studentDisplay = data.val()
        console.log('StudentDisplay is-----------', studentDisplay.Repl)
        if(!studentDisplay.Repl.show) {
          db.ref(`/studentDisplay/${slideId}/Repl`).update({show: true})
        } else {
          db.ref(`/studentDisplay/${slideId}/Repl`).update({show: false})
          db.ref(`/studentDisplay/${slideId}/Repl`).update({question: ''})
          db.ref(`/studentDisplay/${slideId}/Repl`).update({solution: ''})
          dispatch(shareReplSolution(''))
          dispatch(shareReplQ(''))
        }
        // to dispatch something to switch off selected active user
        dispatch(showRepl())
      })
    }
  }

//REDUCER

export default function reducer (state = false, action) {
  switch (action.type) {
    case REPL_SHOW:
      return !state;
      default:
      return state;
  }
}
