//IMPORT firebase
import {db} from '../../../firebase'

//Action Type
const UPDATE_TOOLS = 'UPDATE_TOOLS'


// Action Creator
export const updateTools = tools=>{
  return {
    type: UPDATE_TOOLS,
    tools: tools
  }
}



// Dispatcher
export const updateToolsDispatcher = (tool, slideId) => {
  return dispatch=> {
    db.ref(`/selectedTools/${slideId}`).update({[tool]: {name: tool}})
      .then(data => console.log(data))

    // const listener = db.ref(`/selectedTools/${slideId}`)
    // listener.on('value', snap=>{
    //   const selectedTools = Object.keys(snap.val())
    //   dispatch(updateTools(selectedTools))
    // })
 }
}

export const getToolsDispatcher = (slideId)=> {
  return dispatch=> {
    // const listener = db.ref(`/selectedTools/${slideId}`)
    // listener.on('value', snap => {
    //   const selectedTools = Object.keys(snap.val())
    //   dispatch(getTools(selectedTools))
    // })
  }
}


// Reducer
export default function reducer (state= [], action) {
  switch (action.type) {
    case UPDATE_TOOLS:
      return action.tools;

      default:
      return state;
  }
}
