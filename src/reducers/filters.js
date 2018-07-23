import { itemTypes } from './../defaults';

let defaultState = {};

itemTypes.forEach(itemType => {
  defaultState[itemType] = [];
});

const fieldValues = (state = defaultState, action) => {
  const { type, itemType, filter, id } = action;
  const newState = { ...state };

  switch (type) {
    case 'ADD_FILTER':
      newState[itemType] = newState[itemType].concat(filter);

      return newState;

    case 'REMOVE_FILTER':
      newState[itemType] = newState[itemType].filter(filter => {
        return filter.id !== id;
      });

      return newState

    default:
      return state
  };
};

export default fieldValues;
