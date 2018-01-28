import { combineReducers } from 'redux';
import selectedTools from '../modules/tools/reducers/SelectedTools';
import questions from '../modules/display/reducers/questions'
import InputQ from '../modules/display/reducers/InputQ'
import toggleChoice from '../modules/tools/reducers/ToggleChoice';
import toggleInput from '../modules/tools/reducers/ToggleInput';

export default combineReducers({ selectedTools, questions, toggleChoice, toggleInput, InputQ});

export * from '../modules/tools/reducers/SelectedTools'
export * from '../modules/display/reducers/questions'
export * from '../modules/display/reducers/InputQ'
export * from '../modules/tools/reducers/ToggleChoice'
export * from '../modules/tools/reducers/ToggleInput'
