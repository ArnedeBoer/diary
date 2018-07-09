import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { fieldInfo, handleChange } = this.props;
    const { type, name, placeholder, value } = fieldInfo;

    return (
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    )
  }
};

export default Input;
