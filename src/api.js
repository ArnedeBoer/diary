const performFetch = (itemType, path, data) => {
  const mergedDate = Object.assign({}, data);

  mergedDate.itemType = itemType;

  return fetch(`/api/${path}`, {
    method: "POST",
    body: JSON.stringify(mergedDate),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export const fetchItems = (itemType, filters) =>
  performFetch(itemType, 'filter', filters);

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
