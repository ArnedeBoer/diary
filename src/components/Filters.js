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
    const { itemType, filters, changeFieldValue } = this.props;

    return (
      <div className="sub">
        <h1>Filters:</h1>
        <Form
          formType="filters"
          fields={filters}
          itemType={itemType}
          changeFieldValue={changeFieldValue}
          submit={this.getFiltersAndSetItems}
        />
      </div>
    )
  }
};

export default Filters;
