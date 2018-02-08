import * as actions from './actionTypes';

export default function reducers(state = {lesson: {}, slides:[], currentSlide: null, emotions: [], displayObject:[], selectedTools: {}}, action){
  switch (action.type){
    case actions.ADD_EMOTION:
				return {...state, emotions: [...state.emotions, action.emotion]}
		case actions.GET_DISPLAYOBJECT:
		const obj = state.displayObject.find(display=>display.id===action.displayObject.id)
		if (!obj) {
			return {...state, displayObject: [...state.displayObject, action.displayObject]}
		} else {
			const newArr = state.displayObject.map(display=> {
				if (display.id === action.displayObject.id) {
					return action.displayObject
				} else {
					return display
				}
			})
			return {...state, displayObject: newArr}
		}

    default:
      return state;
  }
}
