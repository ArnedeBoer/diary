import React, { Component } from 'react';

import Item from './Item';

class Items extends Component {
  render() {
    const { items, itemType, itemFields, toggleItemEdit, updateItem, changeFieldValue, deleteItem } = this.props;

    return (
      <div id="items">
        <h1>Items:</h1>
        {
          items.map((item, index) => {
            return (
              <Item
                key={index}
                item={item}
                itemType={itemType}
                itemFields={itemFields}
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
