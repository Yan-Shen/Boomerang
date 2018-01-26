import { combineReducers } from 'redux';
import selectedTools from '../modules/tools/reducers/SelectedTools';

export default combineReducers({ selectedTools });

export * from '../modules/tools/reducers/SelectedTools'
