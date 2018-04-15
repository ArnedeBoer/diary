import React, { Component } from 'react';
import Textarea from './Textarea.jsx';
import Select from './Select.jsx';
import Input from './Input.jsx';

const specialComponents = {
    textarea: Textarea,
    select: Select
};

class MyField extends Component {
    constructor() {
        super();
    }
    
    render() {
        const { field = { type: 'input' }, page, handleChange, updateSelectState, state } = this.props;
        const Field = specialComponents[field.type] || Input;

        return (
            <Field
                field={field}
                page={page}
                addState={state}
                updateSelectState={updateSelectState}
                handleChange={handleChange}
            />
        )
    }
}

export default MyField;