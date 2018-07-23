import { combineReducers } from 'redux';
import itemType from './itemType';
import items from './items';
import filters from './filters';
import fieldInfo from './fieldInfo';

const diaryApp = combineReducers({
	itemType,
	filters,
	items,
	fieldInfo
});

export default diaryApp;
