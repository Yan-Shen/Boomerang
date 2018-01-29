//IMPORT firebase
import {db} from '../../../firebase'

//Action Type
const UPDATE_TOOLS = 'UPDATE_TOOLS'
const GET_TOOLS = 'GET_TOOLS'

// Action Creator
export const updateTools = tools=>{
  return {
    type: UPDATE_TOOLS,
    tools: tools
  }
}

export const getTools = tools=>{
  return {
    type: GET_TOOLS,
    tools: tools
  }
}



// Dispatcher
export const updateToolsDispatcher = (tool, slideId) => {
  return dispatch=> {
    db.ref(`/selectedTools/${slideId}`).update({[tool]: {name: tool}})
    //   .then(data => console.log(data))

    const listener = db.ref(`/selectedTools/${slideId}`)
    listener.on('value', snap=>{
      const selectedTools = Object.keys(snap.val())
      dispatch(updateTools(selectedTools))
    })
 }
}

export const getToolsDispatcher = (slideId)=> {
  return dispatch=> {
    return db.ref(`/selectedTools/${slideId}`).once('value')
      .then(selectedTools => {
        console.log('tools are----------', Object.keys(selectedTools.val()))
        dispatch(getTools(Object.keys(selectedTools.val())))
      })
  }
}


// Reducer
export default function reducer (state= [], action) {
  switch (action.type) {
    case UPDATE_TOOLS:
      return action.tools;
      case GET_TOOLS:
      return action.tools;
      default:
      return state;
  }
}
