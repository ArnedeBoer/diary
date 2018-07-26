import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  handleTextChange,
  fieldInfo: { type, name, placeholder, value }
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleTextChange}
    />
  );
};

Input.propTypes = {
  handleTextChange: PropTypes.func,
  fieldInfo: PropTypes.object
};

export default Input;
