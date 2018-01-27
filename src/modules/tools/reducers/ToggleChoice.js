// ACTION TYPE
const TOGGLE_CHOICE = 'TOGGLE_CHOICE'

// ACTION MAKER
export const toggleChoice = ()=> {
  console.log('toggel choice is triggered')
  return {
    type: TOGGLE_CHOICE,
    bool: 'toggle'
  }
}

//REDUCER

export default function reducer (state = false, action) {
  switch (action.type) {
    case TOGGLE_CHOICE:
      return !state;
      default:
      return state;
  }
}
