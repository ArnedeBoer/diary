import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

import { fetchItems } from './../../api';

class Select extends React.Component {
  constructor() {
    super();

    this.getOptions = this.getOptions.bind(this);
  }

  getOptions(input) {
    if (input.length < 3) {
      return Promise.resolve({ options: null });
    }

    return fetchItems(this.props.fieldInfo.name, { name: input })
      .then(res => res.json())
      .then(results => ({ options: results }));
  }

  render() {
    const AsyncComponent = ReactSelect.Async;
    const {
      handleChange,
      fieldInfo: { name, value, placeholder }
    } = this.props;

    return (
      <AsyncComponent
        placeholder={placeholder}
        value={value}
        onChange={handleChange.bind(this, name)}
        loadOptions={this.getOptions}
        backspaceRemoves={true}
        valueKey="id"
        labelKey="name"
        multi={true}
      />
    )
  }
};

Select.propTypes = {
  handleChange: PropTypes.func,
  fieldInfo: PropTypes.object
};

export default Select;
