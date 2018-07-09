const nullifyStrings = data => {
  Object.keys(data).forEach(thing => {
    const value = data[thing];

    data[thing] = value === '' ? null : value;
  });

  return data;
};

const performFetch = (itemType, path, data) =>
  fetch(`/api/${itemType}/${path}`, {
    method: "POST",
    body: JSON.stringify(nullifyStrings(data)),
    headers: {
      "Content-Type": "application/json"
    }
  });

export const fetchAndSetItems = (itemType, setItems, filters) =>
  performFetch(itemType, 'filter', filters)
    .then(res => {
      if(res.status === 200) {
        return res.json().then(results => {
          setItems(itemType, results);
          return 'success';
        });
      }

      return 'failed';
    });

export const createItem = (itemType, clearForm, itemData) =>
  performFetch(itemType, 'create', itemData)
    .then(res => {
      if (res.status === 201) {
        clearForm(itemType);
        return 'success';
      }

      return 'failed';
    });

export const editItem = (itemType, editItem, itemData) =>
  performFetch(itemType, 'edit', itemData)
    .then(res => {
      if (res.status === 201) {
        editItem(itemType, itemData);
        return 'success';
      }

      return 'failed';
    });

export const setItemToFalse = (itemType, deleteItem, itemData) =>
  performFetch(itemType, 'delete', itemData)
    .then(res => {
      if (res.status === 201) {
        deleteItem(itemType, itemData.id);
        return 'success';
      }

      return 'failed';
    });
