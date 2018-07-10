import React, { Component } from 'react';

import Input from './fields/Input';
import Textarea from './fields/Textarea';
import Select from './fields/Select';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const fields = props.fields;

    Object.keys(fields).forEach(fieldName => {
      const defaultValue = fields[fieldName].type === 'select' ? [] : '';

      fields[fieldName].value = fields[fieldName].value || defaultValue;
    });

    this.state = { fields, incompleteFields: [] };
  }

  handleSelect(fieldName, values) {
    const { itemType, formType, changeFieldValue } = this.props;
    const { fields } = this.state;

    fields[fieldName].value = values;

    this.setState({ fields });

    changeFieldValue(itemType, formType, fieldName, values);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { itemType, formType, changeFieldValue } = this.props;
    const { fields } = this.state;

    fields[name].value = value;

    this.setState({ fields });

    changeFieldValue(itemType, formType, name, value);
  }

  handleSubmit(e) {
    const { formType, fields, submit } = this.props;
    const stateFields = this.state.fields;
    let values = {};

    e.preventDefault();

    const incompleteFields = Object.keys(stateFields).reduce((acc, fieldName) => {
      const invalid = fields[fieldName].required && stateFields[fieldName].value.length === 0;

      return invalid ? acc.concat(fields[fieldName].label) : acc;
    }, []);

    this.setState({ incompleteFields });

    Object.keys(stateFields).forEach(fieldName => {
      values[fieldName] = stateFields[fieldName].value;
    });

    if ( incompleteFields.length === 0 ) {
      submit(values).then(status => {
        if(status === 'success' && formType !== 'itemFields') {
          this.setState({ fields, incompleteFields: [] });
        }
      });
    }
  }

  render() {
    const { fields, incompleteFields } = this.state;
    const { cancel } = this.props;

    return (
      <form>
        {
          Object.keys(fields).map((fieldName, index) => {
            const components = {
              textarea: <Textarea />,
              select: <Select />
            };
            const field = fields[fieldName];
            const { label, required } = field;
            const component = components[field.type] || <Input />;
            field.name = fieldName;

            return (
              <div key={index} className="field">
                <label>{label}{required && ' *'}</label>
                {
                  React.cloneElement(
                    component,
                    {
                      fieldInfo: field,
                      handleChange: this.handleChange,
                      handleSelect: this.handleSelect
                    }
                  )
                }
              </div>
            )
          })
        }
        {
          incompleteFields &&
            <div className="validation">
              {
                incompleteFields.map((name, index) => <p key={index}>{name} is required!</p>)
              }
            </div>
        }

        <button className="primary-button" onClick={this.handleSubmit}>Submit</button>
        {
          cancel && <button className="secondary-button" onClick={cancel}>Cancel</button>
        }
      </form>
    )
  }
};

export default Form;
