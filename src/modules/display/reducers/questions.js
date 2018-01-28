import {db} from '../../../firebase'

// ACTION TYPE
const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS '

// ACTION
export const updateQuestions = questions => {
  return {
    type: UPDATE_QUESTIONS,
    questions: questions
  }
}

// THUNK
export const updateQuestionsThunk = (question, choice, slideId) => {

  return dispatch => {
    const key = db.ref(`/selectedTools/${slideId}/Choice Q/QA`).push().key
    db.ref(`/selectedTools/${slideId}/Choice Q/QA/${key}`).update({question})
    db.ref(`/selectedTools/${slideId}/Choice Q/QA/${key}/choice`).update(choice)

    const listener = db.ref(`/selectedTools/${slideId}/Choice Q/QA/${key}`)
    listener.on('value', snap=>{
      const questions = snap.val()
      dispatch(updateQuestions(questions))
    })
  }
}


// REDUCER
export default function reducer (state= [], action) {
  switch (action.type) {
    case UPDATE_QUESTIONS:
      return action.questions;
      default:
      return state;
  }
}
