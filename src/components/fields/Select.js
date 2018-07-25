import React from 'react';
import ReactSelect from 'react-select';

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
    const { fieldInfo, handleChange } = this.props;
    const { name, value, placeholder } = fieldInfo;
    const AsyncComponent = ReactSelect.Async;

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
}

export default Select;
