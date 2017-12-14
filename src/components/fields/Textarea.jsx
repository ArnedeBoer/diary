import React from 'react';

class Textarea extends React.Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.props.updateSelectState(this.props.field.name, value);
    }

    render() {
        const { name, placeholder, title, defaultValue } = this.props.field;

        return (
            <div className="field">
                <label>{title}:</label>
                <textarea
                    id={name}
                    className="text-field"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={this.props.handleChange}
                    name={name}
                />
            </div>
        )
    }
}

export default Textarea;
