import React from 'react';
import Textarea from './components/fields/Textarea.jsx';
import Select from './components/fields/Select.jsx';
import Input from './components/fields/Input.jsx';

export const renderType = (field, page, handleChange, updateSelectState, state) => {
    switch(field.type) {
        case 'textarea':
        return (
            <Textarea
                field={field}
                page={page}
                updateSelectState={updateSelectState}
                handleChange={handleChange}
            />
        );

        case 'select':
        return (
            <Select
                field={field}
                page={page}
                addState={state}
                updateSelectState={updateSelectState}
                handleChange={handleChange}
            />
        );

        default:
        return (
            <Input
                field={field}
                page={page}
                updateSelectState={updateSelectState}
                handleChange={handleChange}
            />
        );
    }
}
