import React, { Component } from 'react';
import dateformat from 'dateformat';

import Item from './Item';

class Items extends Component {
  render() {
    const { items, itemType, itemFields, toggleItemEdit, updateItem, changeFieldValue, deleteItem } = this.props;
    let itemElements;

    if(items.length === 0) {
      itemElements = <div className="list-item">Geen items gevonden.</div>
    } else {
      itemElements = items.map((item, index) => {
        const fields = JSON.parse(JSON.stringify(itemFields));

        Object.keys(fields).forEach(field => {
          fields[field].value = field === 'date' ? dateformat(item[field], 'yyyy-mm-dd') : item[field];
        });

        return (
          <Item
            key={index}
            itemType={itemType}
            item={item}
            fields={fields}
            toggleItemEdit={toggleItemEdit}
            changeFieldValue={changeFieldValue}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        )
      })
    }

    return (
      <div className="sub">
        <h1>Items:</h1>
        { itemElements }
      </div>
    )
  }
};

export default Items;
