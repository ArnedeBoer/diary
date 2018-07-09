import { itemTypes } from './../defaults';

const currentLocation = window.location.href.split('/')[3];
const startingLocation = itemTypes.includes(currentLocation) ? currentLocation : itemTypes[0];

const type = (state = startingLocation, action) => {
	switch (action.type) {
		case 'CHANGE_ITEMTYPE':
      return action.itemType

		default:
			return state
	}
};

export default type;
