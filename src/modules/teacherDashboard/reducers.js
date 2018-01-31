import * as actions from './actionTypes';

export default function reducers(state = [], action){
  switch (action.type){
    case actions.GET_LESSONS:
			return action.lessons
		case actions.DELETE_LESSON:
				return state.filter(lesson => lesson.id !== action.id)
    default:
      return state;
  }
}
