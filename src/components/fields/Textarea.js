import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  handleTextChange,
  fieldInfo: { name, placeholder, value }
}) => {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleTextChange}
    />
  );
};

Textarea.propTypes = {
  handleTextChange: PropTypes.func,
  fieldInfo: PropTypes.object
};

export default Textarea;
