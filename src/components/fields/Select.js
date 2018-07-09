import React from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  onChange(values) {
    const { fieldInfo, handleSelect } = this.props;

    handleSelect(fieldInfo.name, values);
  }

  getOptions(input) {
    if (!input) {
      return Promise.resolve({ options: null });
    }

    const fieldName = this.props.fieldInfo.name;

    return fetch(`/api/${fieldName}/filter/`, {
      method: "POST",
      body: JSON.stringify({
          name: input
      }),
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(results => {
        return { options: results };
    });
  }

  render() {
    const { fieldInfo } = this.props;
    const { placeholder, label, value } = fieldInfo;
    const AsyncComponent = ReactSelect.Async;

    return (
      <AsyncComponent
        placeholder={placeholder}
        value={value}
        onChange={this.onChange}
        loadOptions={this.getOptions}
        backspaceRemoves={true}
        valueKey="id"
        labelKey="name"
        multi={true}
        name={name}
      />
    )
  }
}

export default Select;
