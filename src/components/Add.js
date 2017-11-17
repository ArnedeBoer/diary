import React from 'react';
import {  getValue, processArray, emptyStringToNull } from './../helpers.js';
import AddField from './AddField';

class Add extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);

        const states = {};

        props.fields.forEach(field => {
            return states[field.name] = '';    
        });

        this.state = states;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {};

        this.props.fields.forEach(field => {
            return data[field.name.replace('add', '')] = field.type === 'select' ? processArray(getValue(field.name)) : emptyStringToNull(getValue(field.name));  
        });

        const userid = '1';

        fetch(`/api/${this.props.page}/create/${userid}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                document.getElementById('add-form').reset();
            }
        });
    };

    render() {
        const requiredFields = this.props.fields.filter(field => field.required);
        const formIsValid = requiredFields.every(field => {
            return this.state[field.name] !== '';
        });

        return (
            <div className="add">
                <h1>Add {this.props.page}</h1>
                <form id="add-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        this.props.fields
                            .map((field, index) => <AddField key={index} index={index} field={field} handleChange={this.handleChange}/>)
                    }
                    <input
                        id="submit"
                        type="submit"
                        disabled={!formIsValid}
                    />
                </form>
            </div>
        )
    }
}

export default Add;
