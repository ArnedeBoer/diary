import React from 'react';
import Select from 'react-select';

class AddField extends React.Component {
    constructor() {
        super();

        this.getOptions = this.getOptions.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            options: [],
            value: []
        }
    }

    onChange(value) {
        this.props.updateSelectState(this.props.field.name, value);

        this.setState({
            value: value,
        });
    }

    getOptions(input) {
        if (!input) {
            return Promise.resolve({ options: null });
        }

        const filterType = this.props.field.name;

        return fetch(`/api/${filterType}/filter/`, {
            method: "POST",
            body: JSON.stringify({name: input}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(results => {
            return { options: results };
        });
    }

    renderText() {
        const { name, placeholder, type } = this.props.field;

        return (
            <input
                id={name}
                className="text-field"
                placeholder={placeholder}
                onChange={this.props.handleChange}
                type={type}
                name={name}
            />
        )
    }

    renderTextarea() {
        const { name, placeholder } = this.props.field;

        return (
            <textarea
                id={name}
                className="text-field"
                placeholder={placeholder}
                onChange={this.props.handleChange}
                name={name}
            />
        )
    }

    renderSelect() {
        const { placeholder } = this.props.field;
        const AsyncComponent = Select.AsyncCreatable;

        return (
            <div>
                <AsyncComponent
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                    loadOptions={this.getOptions}
                    backspaceRemoves={true}
                    valueKey="id"
                    labelKey="name"
                    multi={true}
                    name="form-field-name"
                />
            </div>
        )
    }

    renderType() {
        const { type } = this.props.field;

        switch(type) {
            case 'textarea':
            return this.renderTextarea();

            case 'select':
            return this.renderSelect();

            default:
            return this.renderText();
        }
    }

    render() {
        const { title, name } = this.props.field;

        return (
            <div className="add-field" id={name}>
                <label>{title}:</label>
                { this.renderType() }
            </div>
        )
    }
}

export default AddField;
