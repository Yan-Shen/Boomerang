import * as actions from './actionTypes';

export default function reducers(state = {color: '#ccc', width: 20}, action){
  switch (action.type){
    case actions.CHANGE_COLOR:
  			return {...state, color: action.color}
    case actions.CHANGE_WIDTH:
      	return {...state, width: action.width}
    default:
      return state;
  }
}
