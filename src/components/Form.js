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

    this.state = fields;
  }

  handleSelect(fieldName, values) {
    const { itemType, formType, changeFieldValue } = this.props;
    const newState = this.state;

    newState[fieldName].value = values;

    this.setState(newState);

    changeFieldValue(itemType, formType, fieldName, values);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { itemType, formType, changeFieldValue } = this.props;
    const newState = this.state;

    newState[name].value = value;

    this.setState( newState );

    changeFieldValue(itemType, formType, name, value);
  }

  handleSubmit(e) {
    const { formType, fields, submit } = this.props;
    let values = {};

    e.preventDefault();

    Object.keys(this.state).map(fieldName => {
      values[fieldName] = this.state[fieldName].value;
    });

    submit(values).then(status => {
      if(status === 'success' && formType !== 'itemFields') {
        this.setState(fields);
      }
    });
  }

  render() {
    const fields = this.state;
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
            const component = components[field.type] || <Input />;
            field.name = fieldName;

            return (
              <div key={index}>
                <label>{fields[fieldName].label}</label>
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
        <input id="submit" value="submit" type="submit" onClick={this.handleSubmit}/>
        {
          cancel && <button className="cancel" onClick={cancel}>Cancel</button>
        }
      </form>
    )
  }
};

export default Form;
