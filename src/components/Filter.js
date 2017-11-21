import React from 'react';
import Select from 'react-select';

class Menu extends React.Component {
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
        this.props.updateSelectState(this.props.filter.name, value);

        this.setState({
            value: value,
        });
    }

    getOptions(input) {
        if (!input) {
            return Promise.resolve({ options: null });
        }

        const filterType = this.props.filter.name.replace('add', '');

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
        const { name, placeholder, type } = this.props.filter;

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
        const { name, placeholder } = this.props.filter;

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
        const { placeholder } = this.props.filter;
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
        const { type } = this.props.filter;

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
        return (
            <div className="filter">
                <label>{this.props.filter.title}:</label>
                { this.renderType() }
            </div>
        )
    }
}

export default Menu;
