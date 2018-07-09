import React, { Component } from 'react';
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

    toggleItemEdit(itemType, item.id);

    itemData.id = item.id;

    return editItem(itemType, updateItem, itemData);
  }

  render() {
    const { itemType, item, fields, changeFieldValue } = this.props;
    const { date, editing, name, description, people, locations } = item;
    const title = date ? dateformat(date, 'mmmm dS yyyy') : name;

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
              <button className="delete" onClick={this.toggleDelete}>Delete</button>
          }
          {
            this.state.deleting &&
              <div>
                <button className="delete" onClick={this.toggleDelete}>Cancel</button>
                <button className="delete" onClick={this.delete}>Delete for real</button>
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
        <button className="edit" onClick={this.toggle}>Edit</button>
      </div>
    )
  }
};

export default Item;
