// ACTION TYPE
const REPLQ_SHARE = 'REPLQ_SHARE'

// ACTION MAKER
export const shareReplQ = ()=> {
  return {
    type: REPLQ_SHARE,
    bool: 'share'
  }
}

//REDUCER

export default function reducer (state = false, action) {
  switch (action.type) {
    case REPLQ_SHARE:
      return !state;
      default:
      return state;
  }
}
