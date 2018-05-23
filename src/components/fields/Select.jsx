import React from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {
    constructor(props) {
        super();

        this.onChange = this.onChange.bind(this);
        this.getOptions = this.getOptions.bind(this);

        const defaultValues = props.field.defaultValue === null || props.field.defaultValue === undefined ? [] : props.field.defaultValue;

        this.state = {
            value: defaultValues
        }
    }

    onChange(value) {
        this.props.updateSelectState(this.props.field.name, value);
        this.setState({ value });
    }

    getOptions(input) {
        if (!input) {
            return Promise.resolve({ options: null });
        }

        const fieldType = this.props.field.name;

        return fetch(`/api/${fieldType}/filter/`, {
            method: "POST",
            body: JSON.stringify({
                name: input
            }),
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
        const AsyncComponent = ReactSelect.Async;
        let addState;

        addState = title === 'People' ? this.props.addState.people : this.props.addState.locations;

        return (
            <div className="field">
                <label>{title}:</label>
                <AsyncComponent
                    placeholder={placeholder}
                    value={this.props.addState === undefined ? this.state.value : addState}
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

export default Select;
