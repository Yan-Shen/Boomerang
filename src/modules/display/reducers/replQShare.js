// ACTION TYPE
const REPLQ_SHARE = 'REPLQ_SHARE'

// ACTION MAKER
export const shareReplQ = (question)=> {
  return {
    type: REPLQ_SHARE,
    question: question
  }
}

//REDUCER

export default function reducer (state = '', action) {
  switch (action.type) {
    case REPLQ_SHARE:
      return action.question
      default:
      return state;
  }
}
