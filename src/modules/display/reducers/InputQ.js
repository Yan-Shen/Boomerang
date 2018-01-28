import {db} from '../../../firebase'

// ACTION TYPE
const UPDATE_INPUTQUESTIONS = 'UPDATE_INPUTQUESTIONS '

// ACTION
export const updateInputQuestions = questions => {
  return {
    type: UPDATE_INPUTQUESTIONS,
    questions: questions
  }
}

// THUNK
export const updateInputQuestionsThunk = (question, slideId) => {

  return dispatch => {
    const key = db.ref(`/selectedTools/${slideId}/Input Q/QA`).push().key
    db.ref(`/selectedTools/${slideId}/Input Q/QA/${key}`).update({question})

    const listener = db.ref(`/selectedTools/${slideId}/Input Q/QA/${key}`)
    listener.on('value', snap=>{
      const questions = snap.val()
      dispatch(updateInputQuestions(questions))
    })
  }
}


// REDUCER
export default function reducer (state= [], action) {
  switch (action.type) {
    case UPDATE_INPUTQUESTIONS:
      return action.questions;
      default:
      return state;
  }
}
