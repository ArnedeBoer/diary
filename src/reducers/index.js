import { combineReducers } from 'redux';
import itemType from './itemType';
import items from './items';
import fieldInfo from './fieldInfo';

const diaryApp = combineReducers({
	itemType,
	items,
	fieldInfo
});

export default diaryApp;
