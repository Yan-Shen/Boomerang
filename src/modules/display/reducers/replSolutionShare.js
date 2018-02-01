// ACTION TYPE
const REPLSOLUTION_SHARE = 'REPLSOLUTION_SHARE'

// ACTION MAKER
export const shareReplSolution= (solution)=> {
  return {
    type: REPLSOLUTION_SHARE,
    solution: solution
  }
}

//REDUCER

export default function reducer (state = '', action) {
  switch (action.type) {
    case REPLSOLUTION_SHARE:
      return action.solution;
      default:
      return state;
  }
}
