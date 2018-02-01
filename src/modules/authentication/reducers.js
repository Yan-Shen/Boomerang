import * as actions from './actionTypes';

export default function reducers(state = null,action){
  switch (action.type){
    case actions.USER_STATUS:
      return action.authUser
    default:
      return state;
  }
}
