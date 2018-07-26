import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from './fields/Input';
import Textarea from './fields/Textarea';
import Select from './fields/Select';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const fields = props.fields;

    Object.keys(fields).forEach(fieldName => {
      const defaultValue = fields[fieldName].type === 'select' ? [] : '';

      fields[fieldName].value = fields[fieldName].value || defaultValue;
    });

    this.state = { fields, incompleteFields: [] };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.updateState(nextProps);
  }

  updateState(props) {
    const fields = props.fields;

    Object.keys(fields).forEach(fieldName => {
      const defaultValue = fields[fieldName].type === 'select' ? [] : '';

      fields[fieldName].value = fields[fieldName].value || defaultValue;
    });

    this.setState({ fields, incompleteFields: [] });
  }

  handleChange(name, values) {
    const { itemType, formType, changeFieldValue } = this.props;
    const { fields } = this.state;

    fields[name].value = values;

    this.setState({ fields });

    changeFieldValue(itemType, formType, name, values);
  }

  handleTextChange(e) {
    const { name, value } = e.target;

    this.handleChange(name, value);
  }

  handleSubmit(e) {
    const { formType, fields, submit } = this.props;
    const stateFields = this.state.fields;

    e.preventDefault();

    const incompleteFields = Object.keys(stateFields).reduce((acc, fieldName) => {
      const invalid = fields[fieldName].required && stateFields[fieldName].value.length === 0;

      return invalid ? acc.concat(fields[fieldName].label) : acc;
    }, []);

    this.setState({ incompleteFields });

    if ( incompleteFields.length === 0 ) {
      submit(stateFields).then(status => {
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
                      handleTextChange: this.handleTextChange,
                      handleChange: this.handleChange
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

Form.propTypes = {
  itemType: PropTypes.string,
  changeFieldValue: PropTypes.func,
  formType: PropTypes.string,
  fields: PropTypes.object,
  submit: PropTypes.func,
  cancel: PropTypes.func
};

export default Form;
