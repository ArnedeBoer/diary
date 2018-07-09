import React, { Component } from 'react';
import dateformat from 'dateformat';

import Item from './Item';

class Items extends Component {
  render() {
    const { items, itemType, itemFields, toggleItemEdit, updateItem, changeFieldValue, deleteItem } = this.props;

    return (
      <div id="items">
        <h1>Items:</h1>
        {
          items.map((item, index) => {
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
      </div>
    )
  }
};

export default Items;
