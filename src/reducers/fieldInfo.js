import { itemsInfo } from './../defaults';

const fieldValues = (state = itemsInfo, action) => {
  const { type, itemType, formType, fieldName, value } = action;
	const newState = { ...state };

	switch (type) {
    case 'CHANGE_FIELD_VALUE':
      newState[itemType][formType][fieldName].value = value;

      return newState;

		case 'CLEAR_FORM':
			Object.keys(newState[itemType].fields).forEach(field => {
				const defaultValue = field.type === 'select' ? [] : '';

				newState[itemType].fields[field].value = defaultValue;
			});

			return newState

		default:
			return state
	};
};

export default fieldValues;
