import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setItems, clearForm, changeItemType, changeFieldValue, toggleItemEdit, updateItem, deleteItem } from '../actions';

import Menu from './../components/Menu';
import Filters from './../components/Filters';
import Items from './../components/Items';
import Add from './../components/Add';
import { itemTypes } from './../defaults';

class Main extends Component {
  render() {
    const {
      itemType, filters, fields, itemFields, currentItems,
      changeItemType,
      changeFieldValue,
      setItems,
      toggleItemEdit, updateItem, deleteItem,
      clearForm
    } = this.props;

    return (
      <div key={itemType}>
        <Menu
          itemTypes={itemTypes}
          changeItemType={changeItemType}
        />
        <div id="left">
          <Filters
            filters={filters}
            changeFieldValue={changeFieldValue}
            itemType={itemType}
            setItems={setItems}
          />
          <Items
            itemFields={itemFields}
            items={currentItems}
            itemType={itemType}
            changeFieldValue={changeFieldValue}
            toggleItemEdit={toggleItemEdit}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        </div>
        <div id="right">
          <Add
            fields={fields}
            changeFieldValue={changeFieldValue}
            itemType={itemType}
            clearForm={clearForm}
          />
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  const { items, itemType } = state;
  const currentItems = items[itemType];
  const { filters, fields, itemFields } = state.fieldInfo[itemType];

  return {
    currentItems,
    itemType,
    filters,
    fields,
    itemFields
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeItemType,
    changeFieldValue,
    setItems,
    clearForm,
    toggleItemEdit,
    updateItem,
    deleteItem
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
