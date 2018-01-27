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
export const updateQuestionsThunk = (question, choice, slideId, qType) => {
  console.log('qtype is------------', qType)
  console.log('question is------------', question)
  console.log('slideId is------------', slideId)

  return dispatch => {
    const key = db.ref(`/selectedTools/${slideId}/${qType}/QA`).push().key
    db.ref(`/selectedTools/${slideId}/${qType}/QA/${key}`).update({question})
    db.ref(`/selectedTools/${slideId}/${qType}/QA/${key}/choice`).update(choice)

    const listener = db.ref(`/selectedTools/${slideId}/${qType}/QA/${key}`)
    listener.on('value', snap=>{
      const questions = snap.val()
      console.log('question got back is--------------', questions)
      dispatch(updateQuestions(questions))
    })
  }
}

// export const updateToolsDispatcher = (tool, slideId) => {
//   return dispatch=> {
//     db.ref(`/selectedTools/${slideId}`).update({[tool]: {name: tool}})
//     const listener = db.ref(`/selectedTools/${slideId}`)
//     listener.on('value', snap=>{
//       const selectedTools = Object.keys(snap.val())
//       dispatch(updateTools(selectedTools))
//     })
//  }
// }

// REDUCER
export default function reducer (state= [], action) {
  switch (action.type) {
    case UPDATE_QUESTIONS:
      return action.questions;
      default:
      return state;
  }
}
