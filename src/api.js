export const fetchAndSetItems = (itemType, setItems, filters) => {
  return fetch(`/api/${itemType}/filter`, {
    method: "POST",
    body: JSON.stringify(filters),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    if(res.status === 200) {
      return res.json().then(results => {
        setItems(itemType, results);
        return 'success';
      });
    }

    return 'failed';
  });
};

export const createItem = (itemType, clearForm, itemData) => {
  return fetch(`/api/${itemType}/create`, {
    method: "POST",
    body: JSON.stringify(itemData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    if (res.status === 201) {
      clearForm(itemType);
      return 'success';
    }

    return 'failed';
  });
};

export const editItem = (itemType, editItem, itemData) => {
  return fetch(`/api/${itemType}/edit`, {
    method: "POST",
    body: JSON.stringify(itemData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    if (res.status === 201) {
      editItem(itemType, itemData);
      return 'success';
    }

    return 'failed';
  });
};

export const setItemToFalse = (itemType, deleteItem, itemData) => {
  return fetch(`/api/${itemType}/delete`, {
    method: "POST",
    body: JSON.stringify(itemData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    if (res.status === 201) {
      deleteItem(itemType, itemData.id);
      return 'success';
    }

    return 'failed';
  });
};
