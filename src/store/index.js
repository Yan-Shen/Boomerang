import { combineReducers } from 'redux';
import selectedTools from '../modules/tools/reducers/SelectedTools';
import questions from '../modules/display/reducers/questions'
import toggleChoice from '../modules/tools/reducers/ToggleChoice';


export default combineReducers({ selectedTools, questions, toggleChoice});

export * from '../modules/tools/reducers/SelectedTools'
export * from '../modules/display/reducers/questions'
export * from '../modules/tools/reducers/ToggleChoice'
