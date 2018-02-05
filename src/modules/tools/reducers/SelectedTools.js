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
    return db.ref(`/selectedTools/${slideId}`).once('value')
    .then(selectedTools => {
        dispatch(updateTools(selectedTools.val()))
    // const listener = db.ref(`/selectedTools/${slideId}`)
    // listener.on('value', snap=>{
    //   const selectedTools = snap.val()
    //   dispatch(updateTools(selectedTools))
    // })
 })
}}

export const getToolsDispatcher = (slideId)=> {
  return dispatch=> {

    // return db.ref(`/selectedTools/${slideId}`).once('value')
    const listener = db.ref(`/selectedTools/${slideId}`)
    listener.on('value', snap=>{
      if(snap.val()) {
        dispatch(getTools(snap.val()))
      }
     })

      // .then(selectedTools => {
      //   if (selectedTools.val()) {
      //     dispatch(getTools(selectedTools.val()))
      //   } else {
      //     dispatch(getTools([]))
      //   }
      // })
  }
}


// Reducer
export default function reducer (state= {}, action) {
  switch (action.type) {
    case UPDATE_TOOLS:
      return action.tools;
      case GET_TOOLS:
      return action.tools;
      default:
      return state;
  }
}
