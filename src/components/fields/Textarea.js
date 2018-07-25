import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { fieldInfo, handleTextChange } = this.props;
    const { name, placeholder, value } = fieldInfo;

    return (
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleTextChange}
      />
    )
  }
};

export default Input;
