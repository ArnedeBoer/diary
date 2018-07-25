import React, { Component } from 'react';

import { fetchAndSetItems } from './../api';
import Form from './Form';

class Filters extends Component {
  constructor() {
    super();

    this.getFiltersAndSetItems = this.getFiltersAndSetItems.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);

    this.state = { selectedFilter: null };
  }

  getFiltersAndSetItems(addedFilter) {
    const { itemType, setItems, currentFilters } = this.props;
    const filterName = Object.keys(addedFilter)[0];
    const filterIsFilled = !!addedFilter[filterName].value.length;

    if (filterIsFilled) {
      const { addFilter } = this.props;
      const combinedFilters = Object.assign({}, currentFilters, addedFilter);
      let filterValues = {};

      Object.keys(combinedFilters).forEach(fieldName => {
        filterValues[fieldName] = combinedFilters[fieldName].value;
      });

      addFilter(itemType, addedFilter);

      return fetchAndSetItems(itemType, setItems, filterValues);
    }

    return fetchAndSetItems(itemType, setItems, currentFilters);
  }

  toggleFilter(e) {
    const name = e.target.name;
    const newValue = name === this.state.selectedFilter ? null : name;

    this.setState({ selectedFilter: newValue });
  }

  removeFilter(e) {
    const filterName = e.target.name;
    const { itemType, setItems, currentFilters, removeFilter } = this.props;
    let filterValues = Object.assign({}, currentFilters);

    delete filterValues[filterName];

    Object.keys(filterValues).forEach(fieldName => {
      filterValues[fieldName] = filterValues[fieldName].value;
    });

    removeFilter(itemType, currentFilters[filterName]);

    return fetchAndSetItems(itemType, setItems, filterValues);
  }

  render() {
    const { itemType, filterFields, currentFilters, changeFieldValue } = this.props;
    const { selectedFilter } = this.state;
    const currentSelectedFilter = selectedFilter ? { [selectedFilter]: filterFields[selectedFilter] } : {};

    return (
      <div className="sub filters">
        <h1>Filters:</h1>
        <div className="filter-buttons">
          {
            Object.keys(filterFields).map((filterField, index) => {
              const buttonType = filterField === selectedFilter ? 'primary-button' : 'secondary-button';

              return (
                <button
                  key={index}
                  name={filterField}
                  className={buttonType}
                  onClick={this.toggleFilter}
                >
                  {filterFields[filterField].label}
                </button>
              )
            })
          }
        </div>
        {
          selectedFilter && <Form
            formType="filterFields"
            fields={currentSelectedFilter}
            itemType={itemType}
            changeFieldValue={changeFieldValue}
            submit={this.getFiltersAndSetItems}
          />
        }
        <div className="current-filters">
          {
            Object.values(currentFilters).map((filter, index) => {
              const { label, value } = filter;
              const displayValue = typeof value === 'object' ? value.map(val => val.name).join(', ') : value;

              return (
                <div
                  key={index}
                  className='filter'
                >
                  <p>{label}: {displayValue}</p>
                  <button
                    name={filter.name}
                    onClick={this.removeFilter}
                  >
                    X
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
};

export default Filters;
