// ACTION TYPE
const CHOICE_SHOW = 'CHOICE_SHOW'

// ACTION MAKER
export const showChoice = ()=> {
  return {
    type: CHOICE_SHOW,
    bool: 'show'
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
