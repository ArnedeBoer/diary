import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import Item from './Item';

const Items = ({
  items, itemType, search, itemFields, toggleItemEdit, updateItem, changeFieldValue, deleteItem
}) => {
  const displayItems = !!items.length;

  return (
    <div className="sub items">
      <h1>Items:</h1>
      <button
        onClick={search}
        className="primary-button"
      >
        Search
      </button>
      {
        !displayItems && <div className="list-item">Geen items gevonden.</div>
      }
      {
        displayItems && items.map((item, index) => {
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
};

Items.propTypes = {
  items: PropTypes.array,
  itemType: PropTypes.string,
  search: PropTypes.func,
  itemFields: PropTypes.object,
  toggleItemEdit: PropTypes.func,
  updateItem: PropTypes.func,
  changeFieldValue: PropTypes.func,
  deleteItem: PropTypes.func
};

export default Items;
