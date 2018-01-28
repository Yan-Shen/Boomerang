// ACTION TYPE
const TOGGLE_INPUT = 'TOGGLE_INPUT'

// ACTION MAKER
export const toggleInput = ()=> {
  return {
    type: TOGGLE_INPUT,
    bool: 'toggle'
  }
}

//REDUCER

export default function reducer (state = false, action) {
  switch (action.type) {
    case TOGGLE_INPUT:
      return !state;
      default:
      return state;
  }
}
