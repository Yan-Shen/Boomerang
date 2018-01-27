import { combineReducers } from 'redux';
import selectedTools from '../modules/tools/reducers/SelectedTools';
import slideEdit from '../modules/slideEdit/reducers';
export default combineReducers({
	selectedTools,
	lesson: slideEdit
});

export * from '../modules/tools/reducers/SelectedTools'
