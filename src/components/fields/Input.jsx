import React from 'react';

class Input extends React.Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.props.updateSelectState(this.props.field.name, value);
    }

    render() {
        const { name, placeholder, type, title, defaultValue } = this.props.field;

        return (
            <div className="field">
                <label>{title}:</label>
                <input
                    id={name}
                    className="text-field"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={this.props.handleChange}
                    type={type}
                    name={name}
                />
            </div>
        )
    }
}

export default Input;
