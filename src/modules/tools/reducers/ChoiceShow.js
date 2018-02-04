import {db} from '../../../firebase'
// ACTION TYPE
const CHOICE_SHOW = 'CHOICE_SHOW'

// ACTION MAKER
export const showChoice = ()=> {
  return {
    type: CHOICE_SHOW,
    bool: 'show'
  }
}


export const showChoiceDispatcher = (slideId) => {
  return dispatch => {
    db.ref(`/studentDisplay/${slideId}`).once('value')
      .then(data => {
        const studentDisplay = data.val()
        if(!studentDisplay||!studentDisplay['Choice'] ||!studentDisplay['Choice']['show']) {
          db.ref(`/studentDisplay/${slideId}/Choice`).update({show: true})
        } else {
          db.ref(`/studentDisplay/${slideId}/Choice`).update({show: false})
          // db.ref(`/studentDisplay/${slideId}/Repl`).update({question: ''})
          // db.ref(`/studentDisplay/${slideId}/Repl`).update({solution: ''})
          // dispatch(shareReplSolution(''))
          // dispatch(shareReplQ(''))
        }
        // to dispatch something to switch off selected active user
        dispatch(showChoice())
      })
    }
  }

//REDUCER

export default function reducer (state = false, action) {
  switch (action.type) {
    case CHOICE_SHOW:
      return !state;
      default:
      return state;
  }
}
