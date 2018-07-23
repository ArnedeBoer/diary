import React, { Component } from 'react';

import { fetchAndSetItems } from './../api';
import Form from './Form';

class Filters extends Component {
  constructor() {
    super();

    this.getFiltersAndSetItems = this.getFiltersAndSetItems.bind(this);
  }

  getFiltersAndSetItems(filterValues) {
    const { itemType, setItems } = this.props;

    return fetchAndSetItems(itemType, setItems, filterValues);
  }

  render() {
    const { itemType, filterFields, filters, changeFieldValue } = this.props;

    console.log(filterFields);

    return (
      <div className="sub">
        <h1>Filters:</h1>
        <select defaultValue='default'>
          <option value='default'>-- select an option --</option>
          {
            Object.keys(filterFields).map((filterField, index) => <option value={filterField}>{filterField}</option>)
          }
        </select>
        <Form
          formType="filters"
          fields={filterFields}
          itemType={itemType}
          changeFieldValue={changeFieldValue}
          submit={this.getFiltersAndSetItems}
        />
        {
          filters.map((filter, index) => <p key={index}>{filter.name}: {filter.value}</p>)
        }
      </div>
    )
  }
};

export default Filters;
