import React from 'react';
import Select from 'react-select';

class Input extends React.Component {
    constructor(props) {
        super();

        this.onChange = this.onChange.bind(this);
        this.getOptions = this.getOptions.bind(this);

        let defaultValues = [];

        if (props.page === 'pages' && props.field.defaultValue !== undefined) {
            defaultValues = props.field.defaultValue.map(name => {
                return {
                    name: name
                }
            });

        }

        this.state = {
            options: [],
            value: defaultValues
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

        const fieldType = this.props.field.name.replace('add', '');

        return fetch(`/api/${fieldType}/filter/`, {
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

    render() {
        const { placeholder, title } = this.props.field;
        const AsyncComponent = Select.AsyncCreatable;

        return (
            <div className="field">
                <label>{title}:</label>
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
}

export default Input;
