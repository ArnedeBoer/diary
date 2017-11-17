import React from 'react';

class AddField extends React.Component {
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

    render() {
        const { title, type } = this.props.field;

        return (
            <div className="add-field">
                <label>{title}:</label>
                {
                    type === 'textarea' ? this.renderTextarea() : this.renderText()
                }
            </div>
        )
    }
}

export default AddField;
