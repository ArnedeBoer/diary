import { itemTypes } from './../defaults';

let defaultState = {};

itemTypes.forEach(itemType => {
  defaultState[itemType] = [];
});

const items = (state = defaultState, action) => {
  const { type, itemType, itemData, id, items } = action;

	switch (type) {
    case 'SET_ITEMS':
    return { ...state, [itemType]: items };

    case 'UPDATE_ITEM':
      const updatedItems = state[itemType].map(item => {
        if ( item.id === itemData.id ) {
          return itemData;
        }

        return item;
      });

      return { ...state, [itemType]: updatedItems };

    case 'DELETE_ITEM':
      const filteredItems = state[itemType].filter(item => {
        return item.id !== id;
      });

      return { ...state, [itemType]: filteredItems };

    case 'TOGGLE_ITEM_EDIT':
      const toggledItems = state[itemType].map(item => {
        if ( item.id === id ) {
          item.editing = !item.editing;
          return item;
        }

        return item;
      });

      return { ...state, [itemType]: toggledItems };

		default:
			return state
	}
};

export default items;
