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

export const getTools = tools =>{
  return {
    type: GET_TOOLS,
    tools: tools
  }
}

// Dispatcher
export const updateToolsDispatcher = (tool, slideId) => {
  return dispatch=> {
    // var newPostKey = firebase.database().ref().child('selectedTools').push().key;
    console.log('slideid is----------', slideId)
    // var updates ={}
    // updates[slideId] = {[tool]: {name: tool}}
    db.ref(`/selectedTools/${slideId}`).update({[tool]: {name: tool}})
    const listener = db.ref(`/selectedTools/${slideId}`)
    listener.on('value', snap=>{
      const selectedTools = Object.keys(snap.val())
      dispatch(updateTools(selectedTools))
    })

    // const listener = db.ref().child('selectedTools')

    // db.ref().child('selectedTools').update({[tool]: {name: tool}})
    // listener.on('value', snap=>{
    //   const selectedTools = Object.keys(snap.val())
    //   dispatch(updateTools(selectedTools))
    // })
 }
}

export const getToolsDispatcher = ()=> {
  return dispatch=> {
    const listener = db.ref().child('selectedTools')
    listener.on('value', snap => {
      const selectedTools = Object.keys(snap.val())
      dispatch(getTools(selectedTools))
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

