import {db} from '../../firebase'
import * as actions from './actionTypes';

export const changeColor = color =>  ({type: actions.CHANGE_COLOR, color})
export const changeWidth = width =>  ({type: actions.CHANGE_WIDTH, width})


export function updateSlide (id,data) {
  return function thunk (dispatch) {
		db.ref().child(`slides/${id}/whiteboard`).set(data)
		.then(()=>console.log('updateSlide'))
	}
}
