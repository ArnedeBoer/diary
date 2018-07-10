import React, { Component } from 'react';

import { createItem } from './../api';
import Form from '../components/Form';

class Add extends Component {
  constructor() {
    super();

    this.createItemAndClearForm = this.createItemAndClearForm.bind(this);
  }

  createItemAndClearForm(itemValues) {
    const { itemType, clearForm } = this.props;

    return createItem(itemType, clearForm, itemValues);
  }

  render() {
    const { itemType, fields, changeFieldValue } = this.props;

    return (
      <div className="sub">
        <h1>Add:</h1>
        <Form
          formType="fields"
          fields={fields}
          itemType={itemType}
          changeFieldValue={changeFieldValue}
          submit={this.createItemAndClearForm}
        />
      </div>
    )
  }
};

export default Add;
