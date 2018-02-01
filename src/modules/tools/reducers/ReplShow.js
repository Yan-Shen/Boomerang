import {db} from '../../../firebase'
import StudentDisplay from '../../studentLesson/components/StudentDisplay';

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
        if(!studentDisplay.Repl) {
          db.ref(`/studentDisplay/${slideId}`).update({Repl: true})
        } else {
          db.ref(`/studentDisplay/${slideId}`).update({Repl: false})
        }
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
