import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { itemType, search, currentFilters } = this.props;
    const filterName = Object.keys(addedFilter)[0];
    const filterIsFilled = !!addedFilter[filterName].value.length;

    if (filterIsFilled) {
      const { addFilter } = this.props;
      const combinedFilters = Object.assign({}, currentFilters, addedFilter);

      addFilter(itemType, addedFilter);

      return search(combinedFilters);
    }

    return search(currentFilters);
  }

  toggleFilter(e) {
    const name = e.target.name;
    const newValue = name === this.state.selectedFilter ? null : name;

    this.setState({ selectedFilter: newValue });
  }

  removeFilter(e) {
    const filterName = e.target.name;
    const { itemType, search, currentFilters, removeFilter } = this.props;
    let filterValues = Object.assign({}, currentFilters);

    delete filterValues[filterName];

    removeFilter(itemType, currentFilters[filterName]);

    return search(filterValues);
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

Filters.propTypes = {
  itemType: PropTypes.string,
  search: PropTypes.func,
  currentFilters: PropTypes.object,
  addFilter: PropTypes.func,
  filterFields: PropTypes.object,
  removeFilter: PropTypes.func,
  changeFieldValue: PropTypes.func,
};

export default Filters;
