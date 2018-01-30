// ACTION TYPE
const TOGGLE_REPL = 'TOGGLE_REPL'

// ACTION MAKER
export const toggleRepl= ()=> {
  return {
    type: TOGGLE_REPL,
    bool: 'toggle'
  }
}

//REDUCER

export default function reducer (state = false, action) {
  switch (action.type) {
    case TOGGLE_REPL:
      return !state;
      default:
      return state;
  }
}
