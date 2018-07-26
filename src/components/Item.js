import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import Form from './Form';

import { editItem, setItemToFalse } from './../api';

const generateSublist = (type, listItems) => {
  if ( !listItems || !listItems.length ) {
    return
  }

  const label = type[0].toUpperCase() + type.slice(1);
  const className = `sub-list ${type}`;

  return (
    <div className={className}>
      <h4>{label}</h4>
      <ul>
        {
          listItems.map(item => {
            return (
              <li key={item.id}>{item.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
};

class Item extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.saveItemAndUpdateItems = this.saveItemAndUpdateItems.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.delete = this.delete.bind(this);

    this.state = { deleting: false }
  }

  toggle(e) {
    e.preventDefault();

    const { itemType, item, toggleItemEdit } = this.props;

    if ( !item.editing ) {
      this.setState({ deleting: false });
    }

    toggleItemEdit(itemType, item.id);
  }

  toggleDelete(e) {
    e.preventDefault();

    const deleting = this.state.deleting;

    this.setState({ deleting: !deleting });
  }

  delete(e) {
    e.preventDefault();

    const { itemType, item, deleteItem } = this.props;

    setItemToFalse(itemType, deleteItem, item);
  }

  saveItemAndUpdateItems(itemData) {
    const { itemType, item, toggleItemEdit, updateItem } = this.props;
    let values = {};

    Object.keys(itemData).forEach(fieldName => {
      values[fieldName] = itemData[fieldName].value;
    });

    toggleItemEdit(itemType, item.id);

    values.id = item.id;

    return editItem(itemType, updateItem, values);
  }

  render() {
    const {
      itemType,
      fields,
      changeFieldValue,
      item: { date, editing, name, description, people, locations }
    } = this.props;
    const title = name || dateformat(date, 'mmmm dS yyyy');

    if(editing) {
      return (
        <div className="list-item">
          <Form
            formType="itemFields"
            fields={fields}
            itemType={itemType}
            changeFieldValue={changeFieldValue}
            submit={this.saveItemAndUpdateItems}
            cancel={this.toggle}
          />
          {
            !this.state.deleting &&
              <button className="secondary-button" onClick={this.toggleDelete}>Delete</button>
          }
          {
            this.state.deleting &&
              <div>
                <button className="secondary-button" onClick={this.toggleDelete}>Cancel</button>
                <button className="secondary-button" onClick={this.delete}>Delete for real</button>
              </div>
          }
        </div>
      )
    }

    return (
      <div className="list-item">
        <div className="title"><h2>{title}</h2></div>
        <div className="left">
          <div className="text">{description}</div>
        </div>

        <div className="right">
          {generateSublist('people', people)}
          {generateSublist('locations', locations)}
        </div>
        <div className="info-end" style={{clear: 'both'}}></div>
        <button className="secondary-button" onClick={this.toggle}>Edit</button>
      </div>
    )
  }
};

Item.propTypes = {
  itemType: PropTypes.string,
  item: PropTypes.object,
  toggleItemEdit: PropTypes.func,
  deleteItem: PropTypes.func,
  updateItem: PropTypes.func,
  fields: PropTypes.object,
  changeFieldValue: PropTypes.func
};

export default Item;
