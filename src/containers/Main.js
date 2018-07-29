import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setItems, addFilter, removeFilter, clearForm, changeItemType, changeFieldValue, toggleItemEdit, updateItem, deleteItem } from '../actions';

import Menu from './../components/Menu';
import Filters from './../components/Filters';
import Items from './../components/Items';
import Add from './../components/Add';
import { itemTypes } from './../../shared/defaults';
import { fetchAndSetItems } from './../api';

class Main extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search() {
    const { itemType, setItems, currentFilters } = this.props;

    const filters = Object.assign({}, currentFilters);
    let filterValues = {};

    Object.keys(filters).forEach(fieldName => {
      filterValues[fieldName] = filters[fieldName].value;
    });

    return fetchAndSetItems(itemType, setItems, filterValues);
  }

  render() {
    const {
      itemType, filterFields, fields, itemFields, currentItems,
      changeItemType,
      changeFieldValue,
      setItems, currentFilters, addFilter, removeFilter,
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
            filterFields={filterFields}
            currentFilters={currentFilters}
            changeFieldValue={changeFieldValue}
            itemType={itemType}
            search={this.search}
            setItems={setItems}
            addFilter={addFilter}
            removeFilter={removeFilter}
          />
          <div className="sub-devider"></div>
          <Items
            itemFields={itemFields}
            items={currentItems}
            itemType={itemType}
            search={this.search}
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

Main.propTypes = {
  currentItems: PropTypes.array,
  itemType: PropTypes.string,
  filterFields: PropTypes.object,
  currentFilters: PropTypes.object,
  fields: PropTypes.object,
  itemFields: PropTypes.object,
  changeItemType: PropTypes.func,
  addFilter: PropTypes.func,
  removeFilter: PropTypes.func,
  changeFieldValue: PropTypes.func,
  setItems: PropTypes.func,
  clearForm: PropTypes.func,
  toggleItemEdit: PropTypes.func,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func
};

const mapStateToProps = state => {
  const { items, itemType, filters } = state;
  const currentItems = items[itemType];
  const currentFilters = filters[itemType];
  const { filterFields, fields, itemFields } = state.fieldInfo[itemType];

  return {
    currentItems,
    itemType,
    filterFields,
    currentFilters,
    fields,
    itemFields
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeItemType,
    addFilter,
    removeFilter,
    changeFieldValue,
    setItems,
    clearForm,
    toggleItemEdit,
    updateItem,
    deleteItem
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
