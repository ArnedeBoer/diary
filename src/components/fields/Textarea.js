import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { fieldInfo, handleChange } = this.props;
    const { name, placeholder, value } = fieldInfo;

    return (
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    )
  }
};

export default Input;
