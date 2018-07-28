import { itemTypes } from './../defaults';

const currentItemType = window.location.href.split('/')[3];
const startingItemType = itemTypes.includes(currentItemType) ? currentItemType : itemTypes[0];

const type = (state = startingItemType, action) => {
	switch (action.type) {
		case 'CHANGE_ITEMTYPE':
      return action.itemType

		default:
			return state
	}
};

export default type;
