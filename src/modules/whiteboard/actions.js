import {db} from '../../firebase'
import * as actions from './actionTypes';

export const changeColor = color =>  ({type: actions.CHANGE_COLOR, color})
export const changeWidth = width =>  ({type: actions.CHANGE_WIDTH, width})
