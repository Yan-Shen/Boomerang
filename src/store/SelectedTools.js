//Action Type
const ADD_TOOL = 'ADD_TOOL'

// Action Creator
export const addTool = tool=>{
  return {
    type: ADD_TOOL,
    tool: tool
  }
}

// Dispatcher

// Reducer
export default function reducer (state= [], action) {
  switch (action.type) {
    case ADD_TOOL:
      return [...state, action.tool];

      default:
      return state;
  }
}

