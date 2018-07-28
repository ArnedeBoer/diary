import { itemTypes } from './../../shared/defaults';

let defaultState = {};

itemTypes.forEach(itemType => {
  defaultState[itemType] = {};
});

const fieldValues = (state = defaultState, action) => {
  const { type, itemType, filter } = action;
  const newState = { ...state };

  switch (type) {
    case 'ADD_FILTER':
      newState[itemType] = Object.assign(newState[itemType], filter);

      return newState;

    case 'REMOVE_FILTER':
      delete newState[itemType][filter.name];
      return newState

    default:
      return state
  };
};

export default fieldValues;
