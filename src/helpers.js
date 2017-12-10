import React from 'react';
import Textarea from './components/fields/Textarea';
import Select from './components/fields/Select';
import Input from './components/fields/Input';

export const renderType = (field, index, page, handleChange, updateSelectState, state) => {
    switch(field.type) {
        case 'textarea':
        return (
            <Textarea
                key={index}
                field={field}
                page={page}
                updateSelectState={updateSelectState}
                handleChange={handleChange}
            />
        );

        case 'select':
        return (
            <Select
                key={index}
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
                key={index}
                field={field}
                page={page}
                updateSelectState={updateSelectState}
                handleChange={handleChange}
            />
        );
    }
}
