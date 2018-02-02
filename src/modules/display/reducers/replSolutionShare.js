import {db} from '../../../firebase'
// ACTION TYPE
const REPLSOLUTION_SHARE = 'REPLSOLUTION_SHARE'

// ACTION MAKER
export const shareReplSolution= (solution)=> {
  return {
    type: REPLSOLUTION_SHARE,
    solution: solution
  }
}

export const shareReplSolutionDispatcher = (slideId, solution) =>
{
  console.log('slideid---------', slideId)
  return dispatch => {
      db.ref(`/studentDisplay/${slideId}/Repl`).update({solution})
      .then(()=>{
        dispatch(shareReplSolution(solution))
      })
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
