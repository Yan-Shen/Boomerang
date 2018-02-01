import * as actions from './actionTypes';

export default function reducers(state = {lesson: {}, slides:[], currentSlide: null, emotions: [] }, action){
  switch (action.type){
    case actions.ADD_EMOTION:
  			return {...state, emotions: [...state.emotions, action.emotion]}
    default:
      return state;
  }
}
