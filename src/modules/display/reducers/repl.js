import {db} from '../../../firebase'

// ACTION TYPE
const UPDATE_REPL= 'UPDATE_REPL'

// ACTION
export const updateRepls = repls => {
  return {
    type: UPDATE_REPL,
    repls: repls
  }
}

// THUNK
export const updateReplsThunk = (question, solution, slideId) => {

  return dispatch => {
    const key = db.ref(`/selectedTools/${slideId}/Repl/QA`).push().key
    db.ref(`/selectedTools/${slideId}/Repl/QA/${key}`).update({question})
    db.ref(`/selectedTools/${slideId}/Repl/QA/${key}`).update({solution})
    const listener = db.ref(`/selectedTools/${slideId}/Repl/QA/${key}`)
    listener.on('value', snap=>{
      const repls = snap.val()
      dispatch(updateRepls(repls))
    })
  }
}


// REDUCER
export default function reducer (state= [], action) {
  switch (action.type) {
    case UPDATE_REPL:
      return action.repls;
      default:
      return state;
  }
}
