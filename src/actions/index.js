export const changeItemType = itemType => ({
  type: 'CHANGE_ITEMTYPE',
  itemType
});

export const addFilter = (itemType, filter) => ({
  type: 'ADD_FILTER',
  itemType,
  filter
});

export const removeFilter = (itemType, id) => ({
  type: 'REMOVE_FILTER',
  itemType,
  id
});

export const setItems = (itemType, items) => ({
  type: 'SET_ITEMS',
  itemType,
  items
});

export const toggleItemEdit = (itemType, id) => ({
  type: 'TOGGLE_ITEM_EDIT',
  itemType,
  id
});

export const updateItem = (itemType, itemData) => ({
  type: 'UPDATE_ITEM',
  itemType,
  itemData
});

export const deleteItem = (itemType, id) => ({
  type: 'DELETE_ITEM',
  itemType,
  id
});

export const changeFieldValue = (itemType, formType, fieldName, value) => ({
  type: 'CHANGE_FIELD_VALUE',
  itemType,
  formType,
  fieldName,
  value
});

export const clearForm = itemType => ({
  type: 'CLEAR_FORM',
  itemType
});
