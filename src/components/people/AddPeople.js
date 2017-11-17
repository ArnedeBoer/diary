import React from 'react';
import { getValue, emptyStringToNull } from './../../helpers.js';

class AddPeople extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            addName: '',
            addText: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const person = {
            name: emptyStringToNull(getValue('addName')),
            text: emptyStringToNull(getValue('addText'))
        }

        const userid = '1';

        fetch(`/api/people/create/${userid}`, {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 201) {
                document.getElementById('addPerson').reset();
            }
        });
    };

    render() {
        const { addName } = this.state;
        const nameIsValid = addName.length > 0;
        const formIsValid = nameIsValid;

        return (
            <div className="add addPerson">
                <h1>Add person</h1>
                <form id="addPerson" onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input
                        id="addName"
                        className="text-field"
                        onChange={this.handleChange}
                        type="text"
                        name="addName"
                    />
                    <label>Text:</label>
                    <textarea
                        id="addText"
                        className="text-field"
                        placeholder="This person is ..."
                        onChange={this.handleChange}
                        type="text"
                        name="addText"
                    />
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

export default AddPeople;
