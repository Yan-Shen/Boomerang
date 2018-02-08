import {db} from '../../../firebase'
// ACTION TYPE
const CHOICEQA_SHARE = 'CHOICEQA_SHARE'

// ACTION MAKER
export const shareChoiceQA = (QA)=> {
  return {
    type: CHOICEQA_SHARE,
    QA: QA
  }
}


export const shareChoiceQADispatcher = (slideId, QA) => {
  console.log('slideId==========', slideId)
  console.log('QA==========', QA)
  return dispatch=>{
      db.ref(`/studentDisplay/${slideId}/Choice`).update({QA: QA})
      .then(()=>{
        return dispatch(shareChoiceQA(QA))
      })
    }
  }

//REDUCER
export default function reducer (state = {}, action) {
  switch (action.type) {
    case CHOICEQA_SHARE:
    console.log('action QA=============', action)
      return action.QA
    default:
      return state;
  }
}
